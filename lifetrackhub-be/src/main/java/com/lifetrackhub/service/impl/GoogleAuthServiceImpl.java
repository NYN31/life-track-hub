package com.lifetrackhub.service.impl;

import com.lifetrackhub.constant.enumeration.LoginType;
import com.lifetrackhub.constant.enumeration.Role;
import com.lifetrackhub.constant.utils.DecodedToken;
import com.lifetrackhub.dto.response.LoginResponseDto;
import com.lifetrackhub.dto.response.SsoRedirectUrlResponseDto;
import com.lifetrackhub.dto.response.VerifyCodeResponseDto;
import com.lifetrackhub.entity.User;
import com.lifetrackhub.repository.UserRepository;
import com.lifetrackhub.service.AuthService;
import com.lifetrackhub.service.GoogleAuthService;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class GoogleAuthServiceImpl implements GoogleAuthService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String GOOGLE_PORTAL_URL = "https://accounts.google.com";
    private static final String GOOGLE_TOKEN_ENDPOINT_URL = "https://oauth2.googleapis.com/token";
    private static final String GOOGLE_JWK_URL = "https://www.googleapis.com/oauth2/v3/certs";
    private static final String GOOGLE_ISSUER = "https://accounts.google.com";

    private final AuthService authService;
    private final RestClient restClient;

    private final UserRepository userRepository;

    private final String googleClientId;
    private final String googleRedirectUri;
    private final String googleClientSecret;

    public GoogleAuthServiceImpl(AuthService authService,
                                 RestClient restClient,
                                 UserRepository userRepository,
                                 @Value("${google.client.id}") String googleClientId,
                                 @Value("${google.client.redirect.uri}") String googleRedirectUri,
                                 @Value("${google.client.secret}") String googleClientSecret) {
        this.authService = authService;
        this.restClient = restClient;
        this.userRepository = userRepository;
        this.googleClientId = googleClientId;
        this.googleRedirectUri = googleRedirectUri;
        this.googleClientSecret = googleClientSecret;
    }

    @Override
    public SsoRedirectUrlResponseDto googleRedirectUrl() {
        SsoRedirectUrlResponseDto ssoRedirectUrlResponseDto = new SsoRedirectUrlResponseDto();

        String url = getGoogleRedirectUri();

        log.info("google redirect url : {}", url);

        ssoRedirectUrlResponseDto.setRedirectUrl(url);
        return ssoRedirectUrlResponseDto;
    }

    @Override
    public LoginResponseDto googleLogin(String code) {
        log.info("google login code {}", code);

        String token = exchangeGoogleCodeForToken(code);
        verifyIdToken(token);
        DecodedToken userDetails = decodeTokenAndGetDetails(token);

        Optional<User> userInfo = userRepository.findByEmail(userDetails.getEmail());
        User user;
        if (userInfo.isEmpty()) {
            user = createUser(userDetails, String.valueOf(Role.USER));
            user = userRepository.save(user);
            log.info("User created: {}", user);
        } else {
            user = userInfo.get();
            log.info("User already exist: {}", user);
        }

        return authService.createToken(user);
    }

    private String getGoogleRedirectUri() {
        return UriComponentsBuilder
                .fromHttpUrl(String.format("%s/o/oauth2/v2/auth", GOOGLE_PORTAL_URL))
                .queryParam("client_id", googleClientId)
                .queryParam("response_type", "code")
                .queryParam("redirect_uri", googleRedirectUri)
                .queryParam("response_mode", "query")
                .queryParam("scope", "openid email profile")
                .queryParam("state", UUID.randomUUID().toString())
                .toUriString();
    }

    private String exchangeGoogleCodeForToken(String code) {
        log.info("Exchange Google authorization code for tokens");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", googleClientId);
        body.add("client_secret", googleClientSecret);
        body.add("code", code);
        body.add("redirect_uri", googleRedirectUri);
        body.add("grant_type", "authorization_code");

        VerifyCodeResponseDto response = restClient.post().uri(GOOGLE_TOKEN_ENDPOINT_URL).header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE).body(body).retrieve().body(VerifyCodeResponseDto.class);

        log.info("Response {}", response);

        if (response == null || response.getIdToken() == null) {
            return null;
        }

        return response.getIdToken();
    }

    private void verifyIdToken(String idToken) {
        try {
            SignedJWT signedJWT = parseToken(idToken);

            RSAKey rsaKey = getGooglePublicKey(signedJWT.getHeader());
            log.info("RSA key : {}", rsaKey);
            verifySignature(signedJWT, rsaKey);

            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            log.info("Claims : {}", claims);
            verifyClaims(claims);

            // If you want, extract user info here
            // User user = extractUser(claims);

        } catch (Exception e) {
            throw new RuntimeException("Token validation failed.", e);
        }
    }

    private SignedJWT parseToken(String idToken) throws Exception {
        return SignedJWT.parse(idToken);
    }

    private RSAKey getGooglePublicKey(JWSHeader header) throws Exception {
        JWKSet jwkSet = JWKSet.load(new URL(GOOGLE_JWK_URL));
        JWK jwk = jwkSet.getKeyByKeyId(header.getKeyID());

        if (jwk == null) {
            throw new IllegalArgumentException("Unable to find matching public key for Key ID: " + header.getKeyID());
        }

        if (!(jwk instanceof RSAKey rsaKey)) {
            throw new IllegalArgumentException("Public key is not an RSA key.");
        }

        if (!header.getAlgorithm().equals(JWSAlgorithm.RS256)) {
            throw new IllegalArgumentException("Unsupported signing algorithm: " + header.getAlgorithm());
        }

        return rsaKey;
    }

    private void verifySignature(SignedJWT signedJWT, RSAKey rsaKey) throws Exception {
        RSASSAVerifier verifier = new RSASSAVerifier(rsaKey);
        if (!signedJWT.verify(verifier)) {
            throw new IllegalArgumentException("Invalid token signature.");
        }
    }

    private void verifyClaims(JWTClaimsSet claims) {
        if (!GOOGLE_ISSUER.equals(claims.getIssuer())) {
            throw new IllegalArgumentException("Invalid token issuer: " + claims.getIssuer());
        }

        List<String> audience = claims.getAudience();
        if (audience == null || !audience.contains(googleClientId)) {
            throw new IllegalArgumentException("Invalid token audience: " + audience);
        }

        Date expirationTime = claims.getExpirationTime();
        if (expirationTime == null || expirationTime.before(new Date())) {
            throw new IllegalArgumentException("Token has expired.");
        }
    }

    private User extractUser(JWTClaimsSet claims) throws Exception {
        String email = claims.getStringClaim("email");
        String name = claims.getStringClaim("name");

        User user = new User();
        user.setEmail(email);
        user.setFirstname(name);

        return user;
    }

    private DecodedToken decodeTokenAndGetDetails(String jwtToken) {
        log.info("Decode token {}", jwtToken);
        DecodedToken token;
        try {
            token = DecodedToken.getDecoded(jwtToken);
        } catch (Exception e) {
            throw new BadCredentialsException("JWT Token Decode Failed | " + e.getMessage());
        }

        return token;
    }

    private User createUser(DecodedToken userDetails, String role) {
        log.info("Create user {}", userDetails.getEmail());

        User user = new User();

        user.setFirstname(userDetails.getName());
        user.setLastname("");
        user.setEmail(userDetails.getEmail());
        user.setRole(role);
        user.setEnabled(true);
        user.setUserDetails(null);
        user.setLoginType(LoginType.GOOGLE);

        return user;
    }
}

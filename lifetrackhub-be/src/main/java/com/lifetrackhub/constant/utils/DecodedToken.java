package com.lifetrackhub.constant.utils;

import com.google.gson.Gson;
import lombok.Data;
import lombok.ToString;
import org.apache.commons.codec.binary.Base64;

import java.nio.charset.StandardCharsets;

@Data
@ToString
public class DecodedToken {
    private String email;
    private String name;
    private String sub;
    private String picture;

    public static DecodedToken getDecoded(String encodedToken) {
        String[] pieces = encodedToken.split("\\.");
        String b64payload = pieces[1];
        String jsonString = new String(Base64.decodeBase64(b64payload), StandardCharsets.UTF_8);

        return new Gson().fromJson(jsonString, DecodedToken.class);
    }
}

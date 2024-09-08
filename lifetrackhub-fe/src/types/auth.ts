export interface JWTDecoder {
  enabled: boolean;
  exp: number;
  iat: number;
  iss: string;
  role: string[];
  sub: string;
  userId: number;
}

export interface LoginInputData {
  email: string;
  password: string;
}

export interface RegistrationInputData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

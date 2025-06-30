export interface IJWTDecoder {
  enabled: boolean;
  exp: number;
  iat: number;
  iss: string;
  role: string[];
  sub: string;
  userId: number;
}

export interface ILoginFormInputs {
  email: string;
  password: string;
}

export interface ILoginResponse {
  name: string;
  accessToken: string;
}

export interface IRegisterFormInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type SetPasswordBody = {
  token: string;
  password: string;
  password2: string;
};

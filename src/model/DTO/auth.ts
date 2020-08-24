type LoginRequestBody = {
  email: string;
  password: string;
};

type SetPasswordBody = {
  token: string;
  password: string;
  password2: string;
};

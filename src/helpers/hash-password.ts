import { hash } from "bcrypt";

export const hashPassword = async (password: string) => {
  const response = await hash(password, 10);
  return response;
};

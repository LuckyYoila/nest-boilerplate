import * as bcrypt from 'bcryptjs';
export const hashPassword = async (password: string): Promise<string> => {
  const salt = bcrypt.genSaltSync(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

import { hash, genSalt } from 'bcryptjs';

export async function getHashedPassword(password: string) {
  const salt = await genSalt(+process.env.CRYPT_SALT);
  return await hash(password, salt);
}

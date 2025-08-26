import jwt from 'jsonwebtoken';


export const signToken = (id: string, role: string) => {
  const payload = { id, role };
  const secret = process.env.JWT_SECRET as string;
  // jsonwebtoken types may not allow string, but runtime does. Use as any to bypass type error.
  const options: jwt.SignOptions = { expiresIn: process.env.JWT_EXPIRES || '7d' } as any;
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

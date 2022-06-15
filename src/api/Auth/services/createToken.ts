import * as jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
}

export function createToken(userId: string): string {
  const payload: TokenPayload = {
    id: userId
  };
  const tokenJwt = jwt.sign(payload, process.env.SECRET_KEY || 'dev', { expiresIn: '24h' });

  return tokenJwt;
}

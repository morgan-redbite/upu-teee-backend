import * as Privy from '@privy-io/server-auth';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

const publicKeyPath: string = path.join(__dirname, 'PrivyPub.pem'); // Changed to PrivyPub.pem

interface PrivyAuthPayload {
  sid: string,
  iss: string,
  iat: number,
  aud: string,
  sub: string,
  exp: number,
}

interface ExtendedRequest extends Request {
  privyUser?: PrivyAuthPayload;
}
export const authenticatePrivy = async (
  req: any,
  res: any,
  next: any
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Unauthorized: Missing Authorization header' });
  }

  const token = authorizationHeader // Assuming "Bearer <token>"

  try {
    const publicKeyPem = fs.readFileSync(publicKeyPath, 'utf8'); // Changed to publicKey
    const decoded = jwt.verify(token, publicKeyPem, { algorithms: ['ES256'] }) as any;

    req.privyUser = decoded

    if (!req.privyUser) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Privy authentication failed:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export const privyClient = (authorizationHeaderFromFrontend: string) => {

};
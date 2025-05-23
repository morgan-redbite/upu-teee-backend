import * as Privy from '@privy-io/server-auth';
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { findApiKey } from '../../apikey';

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
  const apiKeyHeader = (req.headers['x-api-key'] as string) || null;

  if (apiKeyHeader) {
    try {
      // Your service should look up the API key in your database,
      // returning something like { manufacturerId: "...", active: true }
      const record = await findApiKey(apiKeyHeader);
      if (!record || !record.active) {
        return res.status(401).json({ error: 'Invalid API key' });
      }
      // Stub in a “user” object so downstream code can treat both cases
      req.privyUser = {
        sub: record.manufacturerId,
        iss: 'api-key',
        sid: '',
        aud: '',
        iat: Date.now() / 1000,
        exp: Infinity,
        authMethod: 'apiKey',
      };
      return next();
    } catch (err) {
      console.error('API key auth failed:', err);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

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
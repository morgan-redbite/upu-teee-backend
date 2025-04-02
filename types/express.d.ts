import { JwtPayload } from "jsonwebtoken";
import express from "express";

interface PrivyAuthPayload {
  sid: string,
  iss: string,
  iat: number,
  aud: string,
  sub: string,
  exp: number,
}

declare global {
  namespace Express {
    interface Request {
      privyUser?: PrivyAuthPayload;
    }
  }
}
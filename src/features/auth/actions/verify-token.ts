/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtVerify } from "jose";

export async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;
  
  try {
    const secret_key = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
    await jwtVerify(token,secret_key, {
      algorithms: ["HS256"]
    })
    return true;
  } catch (error) {
    return false;
  }
}
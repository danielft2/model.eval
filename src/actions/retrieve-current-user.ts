"use server";

import { User } from "@/core/entities/user";
import { cookies } from "next/headers";

export async function retrieveCurrentUser(): Promise<User | null> {
  const user = (await cookies()).get("user")?.value;
  return user ? JSON.parse(user) : null;
}

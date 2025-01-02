"use server";

import { ResponseApp } from "@/api/response";
import { signin } from "@/features/auth/api/signin";
import { SigninData, SigninError } from "@/features/auth/types/signin";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Informe um email válido."),
});

export async function signinAction(
  prevState: unknown,
  data: FormData
): Promise<ResponseApp<SigninData, SigninError>> {
  const email = data.get("email") as string;
  const validatedFields = schema.safeParse({ email });

  if (!validatedFields.success) {
    return {
      error: {
        message: "",
        validations: validatedFields.error.flatten().fieldErrors,
      },
    };
  }

  const response = await signin(email);

  if (response.data) {
    return {
      data: {
        message: response.data,
      },
    };
  }

  return {
    error: {
      message: response.error,
    },
  };
}

import * as z from "zod";

export const loginFormat = z.object({
    email: z
      .email("Enter a valid email address")
      .trim()
      .min(1, { message: "Email is required" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password must be at most 20 characters" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),

    rememberMe: z.boolean().default(false),
    });

export type loginFormatInp = z.input<typeof loginFormat>;
export type loginFomatOut = z.output<typeof loginFormat>;


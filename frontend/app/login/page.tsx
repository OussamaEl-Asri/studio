"use client";

import { SignCard } from "../UI/SingnCard/signCard";
import { loginFormat, loginFormatInp, loginFomatOut } from "../lib/definitions";
import { onSubmit } from "../lib/api/auth";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginForm() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<loginFormatInp, any, loginFomatOut>({
    resolver: zodResolver(loginFormat),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return (
    <form
      className="px-4 sm:px-6 md:px-10 text-primary"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <InputGroup
            className="border-border-default h-10 
          focus-within:border-accent-primary! focus-within:ring-1! 
          focus-within:ring-border-hover!"
          >
            <InputGroupInput
              data-slot="input-group-control"
              type="email"
              aria-invalid={!!errors.email}
              placeholder="john.doe@aistudio.com"
              {...register("email", { required: true })}
            />
            <InputGroupAddon>
              {" "}
              <Mail />
            </InputGroupAddon>
          </InputGroup>
          {!!errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <InputGroup
            className="border-border-default h-10 
          focus-within:border-accent-primary! focus-within:ring-1!
           focus-within:ring-border-hover!"
          >
            <InputGroupInput
              type={hidePassword ? "password" : "text"}
              placeholder="••••••••"
              aria-invalid={!!errors?.password}
              {...register("password", { required: true, minLength: 8 })}
            />
            <InputGroupAddon>
              {" "}
              <Lock />
            </InputGroupAddon>
            <InputGroupAddon
              align="inline-end"
              className="hover:cursor-pointer"
              onClick={() => {
                setHidePassword((prev) => !prev);
              }}
            >
              {hidePassword ? <Eye /> : <EyeOff />}
            </InputGroupAddon>
          </InputGroup>
          {!!errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <FieldGroup
        className="flex flex-row flex-wrap items-center
       justify-between gap-2 my-5"
      >
        <Field orientation="horizontal" className="w-fit">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="remember-me"
                className="bg-card border-border-default
                data-checked:bg-accent-primary data-checked:border-none"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <FieldLabel
            className="text-secondary hover:cursor-pointer"
            htmlFor="remember-me"
          >
            <span>Remember me</span>
          </FieldLabel>
        </Field>

        <Field className="w-fit">
          <FieldLabel className="justify-end self-end">
            <Link
              target="blanc"
              href="/"
              className="text-accent-primary hover:cursor-pointer
          hover:border-b hover:border-b-accent-primaryHover"
            >
              Forgot password?
            </Link>
          </FieldLabel>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <Button
            className="bg-accent-primary py-5 text-center text-[16px]
          hover:bg-accent-primaryHover"
            type="submit"
          >
            Sign in
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default function Login() {
  return (
    <div className="w-full h-full max-w-md mx-auto sm:h-fit sm:mt-10 ">
      <SignCard Render=<LoginForm /> />
    </div>
  );
}

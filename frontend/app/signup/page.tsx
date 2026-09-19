"use client";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { SignCard } from "../UI/SingnCard/signCard";
import { Input } from "@/components/ui/input";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupFormat,
  signupFormatInp,
  signupFormatout,
} from "../lib/definitions";
import { onSubmitSignup } from "../lib/api/auth";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
} from "@/components/ui/empty";

const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
};

const getStrengthDescription = (strength: number) => {
  const description =
    strength == 4
      ? "Strong"
      : strength == 3
      ? "Good"
      : strength == 2
      ? "Fair"
      : strength == 1
      ? "Weak"
      : "";

  return description;
};

const getStrengthBgColor = (strength: number) => {
  const bg =
    strength == 4
      ? "#22C55E"
      : strength == 3
      ? "#EAB308"
      : strength == 2
      ? "#F97316"
      : "#EF4444";
  return bg;
};

const PasswordStrength = ({ strength }: { strength: number }) => {
  const bg = getStrengthBgColor(strength);
  const arr = [];

  for (let i = 0; i < 4; i++) {
    if (i < strength) {
      arr.push(
        <div
          className="h-1 w-1/4 rounded-2xl"
          style={{ backgroundColor: bg }}
        ></div>
      );
    } else {
      arr.push(
        <div
          className="h-1 w-1/4 rounded-2xl"
          style={{ backgroundColor: "#E5E7EB" }}
        ></div>
      );
    }
  }

  return <div className="w-full flex gap-1">{...arr}</div>;
};

function SignupForm() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<signupFormatInp, any, signupFormatout>({
    resolver: zodResolver(signupFormat),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedTo: false,
    },
  });

  const password = useWatch({
    name: "password",
    control: control,
  });

  const strength = getPasswordStrength(password);

  return (
    <form
      className="px-4 sm:px-6 md:px-5 text-primary flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmitSignup)}
    >
      <FieldGroup className="flex-row">
        <Field>
          <FieldLabel htmlFor="first-name" className="flex gap-1">
            <div className="w-full flex justify-between items-center">
              <span className="stretch-0">First Name</span>
              {!!errors.firstName && (
                <FieldError>{errors.firstName.message}</FieldError>
              )}
            </div>
          </FieldLabel>
          <Input
            type="first-name"
            aria-invalid={!!errors.firstName}
            placeholder="John"
            className="border-border-default h-10 
            focus-within:border-accent-primary! focus-within:ring-1! 
          focus-within:ring-border-hover!"
            {...register("firstName")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">
            <div className="w-full flex justify-between items-center">
              <span>Last Name</span>
              {!!errors.lastName && (
                <FieldError>{errors.lastName.message}</FieldError>
              )}
            </div>
          </FieldLabel>
          <Input
            type="last-name"
            placeholder="Doe"
            aria-invalid={!!errors.lastName}
            className="border-border-default h-10 
            focus-within:border-accent-primary! focus-within:ring-1! 
          focus-within:ring-border-hover!"
            {...register("lastName")}
          />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel>
            <div className="w-full flex justify-between items-center">
              <span>Email address</span>
              {!!errors.email && (
                <FieldError className="ml-31 mr-auto">
                  {errors.email.message}
                </FieldError>
              )}
            </div>
          </FieldLabel>
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
              {...register("email")}
            />
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel>
            <div className="w-full flex justify-between items-center">
              <span>Password</span>
              {!!errors.password && (
                <FieldError className="ml-20 mr-auto">
                  {errors.password.message}
                </FieldError>
              )}
            </div>
          </FieldLabel>
          <InputGroup
            className="border-border-default h-10 
          focus-within:border-accent-primary! focus-within:ring-1!
           focus-within:ring-border-hover!"
          >
            <InputGroupInput
              type={hidePassword ? "password" : "text"}
              placeholder="••••••••"
              aria-invalid={!!errors?.password}
              {...register("password")}
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
          <Empty className="flex-row gap-1 w-full  px-1! py-0">
            <EmptyContent>
              <PasswordStrength strength={strength} />
              <EmptyDescription
                className="text-[16px]"
                style={{ color: getStrengthBgColor(strength) }}
              >
                {getStrengthDescription(strength)}
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        </Field>

        <Field>
          <FieldLabel>
            <div className="w-full flex justify-between items-center">
              <span>Confirm password</span>
              {!!errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </div>
          </FieldLabel>
          <InputGroup
            className="border-border-default h-10 
          focus-within:border-accent-primary! focus-within:ring-1!
           focus-within:ring-border-hover!"
          >
            <InputGroupInput
              type={hideConfirmPassword ? "password" : "text"}
              placeholder="••••••••"
              aria-invalid={!!errors?.confirmPassword}
              {...register("confirmPassword")}
            />
            <InputGroupAddon>
              {" "}
              <Lock />
            </InputGroupAddon>
            <InputGroupAddon
              align="inline-end"
              className="hover:cursor-pointer"
              onClick={() => {
                setHideConfirmPassword((prev) => !prev);
              }}
            >
              {hideConfirmPassword ? <Eye /> : <EyeOff />}
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field orientation="horizontal" className="w-fit">
          <Controller
            name="agreedTo"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="agreed-to"
                aria-invalid={!!errors.agreedTo}
                className="bg-card border-border-default
                data-checked:bg-accent-primary data-checked:border-none"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <FieldLabel className="text-secondary">
            I agree to{" "}
            <Link
              className="text-accent-primary hover:cursor-pointer hover:border-b
             hover:border-b-accent-primaryHover"
              href="/"
              target="_blank"
            >
              the Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              className="text-accent-primary hover:cursor-pointer hover:border-b
             hover:border-b-accent-primaryHover"
              href="/"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </FieldLabel>
        </Field>

        <Field>
          <Button
            className="bg-accent-primary py-5 text-center text-[16px]
          hover:bg-accent-primaryHover"
            type="submit"
          >
            Create account
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default function page() {
  return (
    <div className="w-full h-full max-w-md mx-auto sm:h-fit sm:mt-10 pb-5">
      <SignCard isLogin={false} Render=<SignupForm /> />
    </div>
  );
}

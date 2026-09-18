"use client";

import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
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

function SignupForm() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  return (
    <form className="px-4 sm:px-6 md:px-5 text-primary flex flex-col gap-5">
      <FieldGroup className="flex-row">
        <Field>
          <FieldLabel htmlFor="first-name">First Name</FieldLabel>
          <Input
            type="first-name"
            placeholder="John"
            className="border-border-default h-10 
            focus-within:border-accent-primary! focus-within:ring-1! 
          focus-within:ring-border-hover!"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
          <Input
            type="last-name"
            placeholder="Doe"
            className="border-border-default h-10 
            focus-within:border-accent-primary! focus-within:ring-1! 
          focus-within:ring-border-hover!"
          />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel>Email address</FieldLabel>
          <InputGroup
            className="border-border-default h-10 
          focus-within:border-accent-primary! focus-within:ring-1! 
          focus-within:ring-border-hover!"
          >
            <InputGroupInput
              data-slot="input-group-control"
              type="email"
              // aria-invalid={!!errors.email}
              placeholder="john.doe@aistudio.com"
              // {...register("email", { required: true })}
            />
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <InputGroup
            className="border-border-default h-10 
          focus-within:border-accent-primary! focus-within:ring-1!
           focus-within:ring-border-hover!"
          >
            <InputGroupInput
              type={hidePassword ? "password" : "text"}
              placeholder="••••••••"
              // aria-invalid={!!errors?.password}
              // {...register("password", { required: true, minLength: 8 })}
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
        </Field>

        <Field>
          <FieldLabel>Confirm password</FieldLabel>
          <InputGroup
            className="border-border-default h-10 
          focus-within:border-accent-primary! focus-within:ring-1!
           focus-within:ring-border-hover!"
          >
            <InputGroupInput
              type={hideConfirmPassword ? "password" : "text"}
              placeholder="••••••••"
              // aria-invalid={!!errors?.password}
              // {...register("password", { required: true, minLength: 8 })}
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
          <Checkbox
            id="remember-me"
            className="bg-card border-border-default
                data-checked:bg-accent-primary data-checked:border-none"
            // checked={field.value}
            // onCheckedChange={field.onChange}
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
    <div className="w-full h-full max-w-md mx-auto sm:h-fit sm:mt-10 ">
      <SignCard Render=<SignupForm /> />
    </div>
  );
}

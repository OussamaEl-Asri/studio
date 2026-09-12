"use client";

import { SignCard } from "../UI/SingnCard/signCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
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

function LoginForm() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  return (
    <form className="px-10 text-primary">
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
              className=""
              type="email"
              //   aria-invalid
              required={true}
              placeholder="john.doe@aistudio.com"
            />
            <InputGroupAddon>
              {" "}
              <Mail />
            </InputGroupAddon>
          </InputGroup>
          {/* <FieldError>Invalid Email</FieldError> */}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <InputGroup
            className="border-border-default h-10 
          focus-within:border-accent-primary! focus-within:ring-1!
           focus-within:ring-border-hover!"
          >
            <InputGroupInput
              required={true}
              type="password"
              placeholder="••••••••"
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
          {/* <FieldError>Invalid Password</FieldError> */}
        </Field>
      </FieldGroup>

      <FieldGroup className="flex-row items-center  my-5">
        <Field orientation="horizontal">
          <Checkbox
            id="remember-me"
            className="bg-card border-border-default
              data-checked:bg-accent-primary data-checked:border-none"
            required={true}
          />
          <FieldLabel
            className="text-secondary hover:cursor-pointer"
            htmlFor="remember-me"
          >
            <span>Remember me</span>
          </FieldLabel>
        </Field>

        <Field>
          <FieldLabel className="justify-end">
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
    <div className="w-120 bg-card ml-100 mt-10">
      <SignCard Render=<LoginForm />></SignCard>
    </div>
  );
}

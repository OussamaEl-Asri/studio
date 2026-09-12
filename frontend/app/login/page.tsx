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
import { Mail, Lock } from "lucide-react";

function LoginForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel>Email address</FieldLabel>
          <InputGroup>
            <InputGroupInput placeholder="john.doe@aistudio.com" />
            <InputGroupAddon>
              {" "}
              <Mail />
            </InputGroupAddon>
          </InputGroup>
          {/* <FieldError>Invalid Email</FieldError> */}
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <InputGroup>
            <InputGroupInput type="password" placeholder="••••••••" />
            <InputGroupAddon>
              {" "}
              <Lock />
            </InputGroupAddon>
          </InputGroup>
          {/* <FieldError>Invalid Password</FieldError> */}
        </Field>
      </FieldGroup>

      <FieldGroup className="flex-row items-center  my-5">
        <Field orientation="horizontal">
          <Checkbox />
          <FieldLabel>Remember me</FieldLabel>
        </Field>

        <Field>
          <FieldLabel className="justify-end">
            <Link target="blanc" href="/">
              Forgot password?
            </Link>
          </FieldLabel>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <Button>Sign in</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default function Login() {
  return (
    <div className="w-120 bg-card ml-100 mt-20">
      <SignCard Render=<LoginForm />></SignCard>
    </div>
  );
}

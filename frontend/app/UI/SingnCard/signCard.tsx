"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export function SignCard({ Render }: { Render: ReactNode }) {
  return (
    <Card className="w-full h-full ">
      <CardHeader className=" ">
        <CardTitle
          className="text-primary flex flex-col gap-10
        justify-center items-center mt-5"
        >
          <div className="flex gap-3 items-center">
            <Layers
              size={35}
              color={"white"}
              className="bg-accent-primary px-2 py-2 rounded-[8px]"
            />{" "}
            <span> AI Studio </span>
          </div>
          <h1 className="text-[28px]">Welcome back</h1>
        </CardTitle>
        <CardDescription className="text-center mt-2 text-[16px]">
          Sign in to continue with AI Studio
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-5">{Render}</CardContent>
      <CardFooter className="bg-card border-none flex-col gap-5">
        {/* separator */}
        <div className="flex gap-2 text-secondary">
          <div className="w-30 h-0.5 bg-accent-soft self-center"></div>
          <div className="text-center">or continue with</div>
          <div className="w-30 h-0.5 bg-accent-soft self-center"></div>
        </div>

        {/* Oauth */}
        <div className=" w-full flex justify-evenly">
          <Button
            className="bg-card text-primary w-1/3 py-5 text-center 
          border-border-default flex items-center justify-center 
          hover:bg-accent-soft hover:border-border-hover group"
          >
            <Image
              src="/icons/google.svg"
              width={18}
              height={18}
              className=""
              alt="Google icon"
            />
            Google
          </Button>
          <Button
            className="bg-card text-primary w-1/3 py-5 text-center
           border-border-default flex items-center justify-center 
           hover:bg-accent-soft hover:border-border-hover"
          >
            <Image
              src="/icons/github.svg"
              width={18}
              height={18}
              alt="Github icon"
            />
            Github
          </Button>
        </div>

        {/* login */}
        <div className="text-secondary">
          Don't have an account?{" "}
          <Link
            href="/"
            target="black"
            className="text-accent-primary hover:cursor-pointer
          hover:border-b hover:border-b-accent-primaryHover "
          >
            Sign up{" "}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

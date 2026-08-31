import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LucideIcon, Dot } from "lucide-react";

export const Header = ({
  title,
  Icon,
  description,
}: {
  title: string;
  Icon: LucideIcon;
  description: string;
}) => {
  return (
    <CardHeader className=" bg-card rounded-none">
      <CardTitle className="mt-5 ml-10 text-[24px]  ">
        <Icon
          color="#6366F1"
          className="relative top-5 bg-accent-soft w-12 h-12 px-2 py-2 rounded-2xl"
        />
        <span className="relative left-18 top-auto bottom-10 text-primary">
          {" "}
          {title}
        </span>
      </CardTitle>
      <CardDescription className="relative top-auto bottom-10 left-28 text-secondary">
        {description}
      </CardDescription>
      <CardAction className="flex items-center  justify-start text-status-online mt-10 mr-5 text-[16px]">
        <Dot className="ml-20 mr-auto w-9 h-9 " />
        <span>Online</span>
      </CardAction>
    </CardHeader>
  );
};

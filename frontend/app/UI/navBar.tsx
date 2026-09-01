"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {
  Layers,
  Bell,
  UserRound,
  Settings,
  TextAlignStart,
  Info,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { spacing, routeIcons } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import clsx from "clsx";

const UserAvatre = ({
  avatarUrl,
  avatarFallback,
}: {
  avatarUrl: string;
  avatarFallback: string;
}) => (
  <Avatar className="w-10 h-10">
    <AvatarImage
      src={avatarUrl}
      alt="user avatar icon"
      className="w-10 h-10 px-2 py-2 bg-accent-soft"
    />
    <AvatarFallback
      className="bg-accent-soft 
text-accent-primary "
    >
      {" "}
      {avatarFallback}
    </AvatarFallback>
  </Avatar>
);

type MenuGroup = { title: string; Icon: LucideIcon };

const menuLabels = [
  {
    id: "group1",
    groups: [
      {
        title: "profile",
        Icon: UserRound,
      },
      {
        title: "Settings",
        Icon: Settings,
      },
      {
        title: "My CVs",
        Icon: TextAlignStart,
      },
    ],
  },
  {
    id: "group2",
    groups: [
      {
        title: "Help & support",
        Icon: Info,
      },
      {
        title: "What's new",
        Icon: Info,
      },
    ],
  },
  {
    id: "group3",
    groups: [
      {
        title: "Log out",
        Icon: LogOut,
      },
    ],
  },
];

export const NavBar = ({
  hrefs,
  title,
  pathname,
}: {
  hrefs: string[];
  title: string[];
  pathname: string;
}) => {
  return (
    <NavigationMenu
      className="max-w-full items-center justify-start py-4 
      text-secondary"
    >
      <NavigationMenuList className="max-w-1/4 text-xl">
        <NavigationMenuItem
          className="flex gap-4 items-center 
          text-primary text-[20px]"
        >
          <Layers
            size={35}
            color={"white"}
            className="bg-accent-primary px-2 py-2 rounded-[8px]"
          />{" "}
          <span> AI Studio </span>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList className="max-w-2/4 justify-around">
        {hrefs.map((href, ind) => {
          const Icon = routeIcons[href];

          return (
            <NavigationMenuItem key={ind} className="px-2 py-2">
              <NavigationMenuLink
                key={ind + 1}
                render={<Link href={href} />}
                className="hover:bg-accent-soft hover:text-primary 
                  focus:bg-accent-soft py-2! px-8! text-[18px] gap-3"
                style={{
                  paddingTop: spacing.sm,
                  paddingBottom: spacing.sm,
                  backgroundColor: pathname === href ? "#EEF2FF" : undefined,
                  color: pathname === href ? "#6366F1" : undefined,
                }}
              >
                <Icon /> {title[ind]}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <NavigationMenuList
        className="max-w-1/4 items-center 
        justify-end-safe gap-5 "
      >
        {/* notification bell */}
        <NavigationMenuItem
          render={<button></button>}
          className="hover:bg-accent-soft hover:text-primary 
            px-3 py-3 rounded-[10px]"
        >
          <Bell />
        </NavigationMenuItem>

        {/* user avatar */}
        <NavigationMenuItem
          className="mr-8 w-fit flex gap- items-center px-1 py-1
        hover:bg-accent-soft hover:text-primary rounded-[10px]"
        >
          <DropdownMenu highlightItemOnHover={false}>
            <DropdownMenuTrigger openOnHover>
              <UserAvatre avatarUrl="/user.png" avatarFallback="JD" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80 px-5 py-3 text-secondary"
            >
              <DropdownMenuGroup className="flex">
                <DropdownMenuItem className="">
                  <UserAvatre avatarUrl="/user.png" avatarFallback="JD" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex flex-col gap-0 items-start 
                justify-center text-[20px] text-primary"
                >
                  <div>John Doe</div>
                  <div className="text-[14px] text-secondary">
                    johndoe@gmail.com
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              {menuLabels.map((group, ind) => (
                <DropdownMenuGroup key={ind} className="mt-3">
                  {group.groups?.map((label) => {
                    const Icon = label.Icon;
                    return (
                      <DropdownMenuItem
                        key={crypto.randomUUID()}
                        className={clsx(
                          "text-[16px]  hover:text-primary  gap-2 pl-3 group",
                          {
                            "hover:bg-main text-[#374151]":
                              group.id !== "group3",
                          },
                          {
                            "hover:bg-[#FEF2F2] text-status-error":
                              group.id === "group3",
                          }
                        )}
                      >
                        <Icon
                          className={clsx({
                            "group-hover:text-accent-primary":
                              group.id !== "group3",
                            "text-secondary  group-hover:text-status-error":
                              group.id === "group3",
                          })}
                        />
                        <span>{label.title}</span>
                      </DropdownMenuItem>
                    );
                  })}
                  {group.id !== "group3" && <DropdownMenuSeparator />}
                </DropdownMenuGroup>
              ))}
              {/* <DropdownMenuGroup className="mt-3">
                {menuLabels.group1.map((group) => {
                  const Icon = group.Icon;
                  return (
                    <DropdownMenuItem
                      key={crypto.randomUUID()}
                      className="text-[16px] text-[#374151] hover:text-primary 
                      hover:bg-main gap-2 hover pl-3 group"
                    >
                      <Icon className="group-hover:text-accent-primary" />
                      <span>{group.title}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuGroup className="mt-3">
                {menuLabels.group2.map((group) => {
                  const Icon = group.Icon;
                  return (
                    <DropdownMenuItem
                      key={crypto.randomUUID()}
                      className="text-[16px] text-[#374151] hover:text-primary 
                      hover:bg-main gap-2 hover pl-3 group"
                    >
                      <Icon className="group-hover:text-accent-primary" />
                      <span>{group.title}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuGroup className="mt-3">
                {menuLabels.group3.map((group) => {
                  const Icon = group.Icon;
                  return (
                    <DropdownMenuItem
                      key={crypto.randomUUID()}
                      className="text-[16px] text-status-error hover:text-primary 
                       gap-2 hover pl-3 group hover:bg-[#FEF2F2]"
                    >
                      <Icon className="text-secondary  group-hover:text-status-error" />
                      <span>{group.title}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

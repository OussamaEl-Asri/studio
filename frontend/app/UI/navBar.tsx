"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Layers, Bell, ChevronDown, Icon } from "lucide-react";
import { spacing, routeIcons } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        justify-end-safe gap-10 "
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
        <NavigationMenuItem>
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="/user.png"
              alt="user avatar icon"
              className="w-10 h-10 px-2 py-2 bg-accent-soft"
            />
            <AvatarFallback
              className="bg-accent-soft 
              text-accent-primary "
            >
              {" "}
              ER{" "}
            </AvatarFallback>
          </Avatar>
        </NavigationMenuItem>

        {/* setting arrow */}
        <NavigationMenuItem
          render={<button onClick={() => console.log("clicked ....")}></button>}
          className="mr-8 hover:bg-accent-soft hover:text-primary 
            py-1 w-12 h-12 rounded-[10px] flex justify-center items-end"
        >
          <ChevronDown />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

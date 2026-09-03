"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Layers } from "lucide-react";
import { spacing, routeIcons } from "../../lib/utils";

import { Menu, NotificationPlaceholder } from "./utils";

import clsx from "clsx";

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
        <NavigationMenuItem className="flex items-center">
          <NotificationPlaceholder />
        </NavigationMenuItem>

        {/* user avatar */}
        <NavigationMenuItem
          className="mr-8 w-fit flex gap- items-center px-1 py-1
        hover:bg-accent-soft hover:text-primary rounded-[10px]"
        >
          <Menu />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

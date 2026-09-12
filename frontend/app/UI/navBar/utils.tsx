import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { Bell } from "lucide-react";

import { menuLabels } from "../../lib/utils";

const UserAvatre = ({
  avatarUrl,
  avatarFallback,
}: {
  avatarUrl: string;
  avatarFallback: string;
}) => (
  <Avatar className="w-10 h-10">
    <AvatarImage src={avatarUrl} alt="user avatar icon" />
    <AvatarFallback
      className="bg-accent-soft 
  text-accent-primary "
    >
      {" "}
      {avatarFallback}
    </AvatarFallback>
  </Avatar>
);

const NotificationBadge = ({ number }: { number: number }) => (
  <span
    className="relative left-1 bottom-7
      min-w-4 h-4 px-1
      rounded-full
      bg-status-error
      flex items-center justify-center
      text-white text-[12px]
      whitespace-nowrap"
  >
    {number > 99 ? "99+" : number}
  </span>
);

export const Menu = () => (
  <DropdownMenu highlightItemOnHover={false}>
    <DropdownMenuTrigger openOnHover>
      <UserAvatre avatarUrl="/user.png" avatarFallback="JD" />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-80 px-5 py-3 text-secondary">
      <DropdownMenuGroup className="flex">
        <DropdownMenuItem className="">
          <UserAvatre avatarUrl="/user.png" avatarFallback="JD" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-col gap-0 items-start 
        justify-center text-[20px] text-primary"
        >
          <div>John Doe</div>
          <div className="text-[14px] text-secondary">johndoe@gmail.com</div>
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
                    "hover:bg-main text-[#374151]": group.id !== "group3",
                  },
                  {
                    "hover:bg-[#FEF2F2] text-status-error":
                      group.id === "group3",
                  }
                )}
              >
                <Icon
                  className={clsx({
                    "group-hover:text-accent-primary": group.id !== "group3",
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
    </DropdownMenuContent>
  </DropdownMenu>
);

import {
  UnreadNotifications,
  readNotification,
  notificationIcon,
} from "@/app/seed/notifications";

export const NotificationPlaceholder = () => (
  <DropdownMenu highlightItemOnHover={false}>
    <DropdownMenuTrigger
      openOnHover
      className="hover:bg-accent-soft hover:text-primary
             px-3 py-3 rounded-[10px]! w-12 h-12 "
    >
      <Bell />
      <NotificationBadge number={5} />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-90 h-100 py-3">
      <DropdownMenuGroup className="flex items-center justify-between  pr-3">
        <DropdownMenuItem className="text-[18px] text-primary px-3">
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[16px] text-accent-primary px-2 hover:bg-accent-soft">
          Mark all as read
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuGroup className="mt-2">
        <DropdownMenuLabel className="text-secondary text-[14px] mb-1 px-3">
          NEW
        </DropdownMenuLabel>
        {UnreadNotifications.map((notification, ind) => {
          const Icon = notificationIcon[notification.type][0];
          const bg = notificationIcon[notification.type][1];
          const color = notificationIcon[notification.type][2];
          return (
            <DropdownMenuItem
              key={ind}
              className="gap-5 bg-[#FAFBFF] hover:bg-[#F5F3FF] 
              rounded-[10px] items-start pl-3"
            >
              <div
                className="mt-2 px-2 py-2 rounded-lg"
                style={
                  { backgroundColor: bg, color: color } as React.CSSProperties
                }
              >
                <Icon />
              </div>
              <div>
                <h1 className="text-[17px] font-semibold">
                  {notification.title}
                </h1>
                <p className="text-[14px]">{notification.message}</p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>

      <DropdownMenuGroup className="mt-2">
        <DropdownMenuLabel className="text-secondary text-[14px] mb-1 px-3">
          EARLIER
        </DropdownMenuLabel>
        {readNotification.map((notification, ind) => {
          const Icon = notificationIcon[notification.type][0];
          const bg = notificationIcon[notification.type][1];
          const color = notificationIcon[notification.type][2];
          return (
            <DropdownMenuItem
              key={ind}
              className="gap-5 bg-card hover:bg-main rounded-[10px] 
              items-start pl-3"
            >
              <div
                className="mt-2 px-2 py-2 rounded-lg"
                style={
                  { backgroundColor: bg, color: color } as React.CSSProperties
                }
              >
                <Icon />
              </div>
              <div>
                <h1 className="text-[17px] font-semibold">
                  {notification.title}
                </h1>
                <p className="text-[14px]">{notification.message}</p>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

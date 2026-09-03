"use client";
import { usePathname } from "next/navigation";

import { NavBar } from "../UI/navBar/navBar";
import { AppSidbar } from "../UI/sideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen">
      <header className="w-full border border-border-default">
        <NavBar
          hrefs={[
            "/dashboard/chatBot",
            "/dashboard/cryptoAgent",
            "/dashboard/cvMakerAgent",
          ]}
          title={["Chat Bot", "Crypto Agent", "CV Maker"]}
          pathname={pathname}
        />
      </header>
      <div className="w-full flex">
        <div className="w-fit">
          <SidebarProvider
            className="w-full"
            style={
              {
                "--sidebar-width": "100%",
              } as React.CSSProperties
            }
          >
            <AppSidbar />
          </SidebarProvider>
        </div>
        <div className="w-full h-screen">{children}</div>
      </div>
    </div>
  );
}

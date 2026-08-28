"use client";
import { usePathname } from "next/navigation";

import { NavBar } from "../UI/navBar";

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
      {children}
    </div>
  );
}

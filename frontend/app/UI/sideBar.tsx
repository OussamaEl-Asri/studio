"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus, Search, MessageCircleMore } from "lucide-react";

const Chat = ({ chats, label }: { chats: string[]; label: string }) => {
  return (
    <SidebarGroup className="mt-0">
      <SidebarGroupLabel className="text-secondary">{label}</SidebarGroupLabel>
      <SidebarMenu>
        {chats.map((message, ind) => (
          <SidebarMenuItem key={ind}>
            <SidebarMenuButton
              className="text-secondary w-full py-5 mb-2 text-[16px] gap-2
            hover:text-accent-primaryHover hover:bg-accent-soft"
            >
              <MessageCircleMore /> <span>{message}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export function AppSidbar() {
  return (
    <Sidebar
      className="relative h-screen max-w-full bg-sidebar"
      collapsible="icon"
    >
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="px-3 flex flex-col gap-3 scroll-smooth">
              <SidebarMenuButton
                className="text-[16px] text-primary bg-card gap-2 
              pr-auto pl-15 py-5 items-center border hover:border-border-hover 
              border-border-default cursor-pointer rounded-[10px]"
              >
                <Plus color="#6366F1" />
                <span>New Chat</span>
              </SidebarMenuButton>

              <InputGroup
                className="bg-card h-9! rounded-[10px]
              has-[[data-slot=input-group-control]:focus-visible]:ring-0 
              has-[[data-slot=input-group-control]:focus-visible]:border-transparent"
              >
                <InputGroupInput
                  className="text-primary placeholder:text-secondary"
                  placeholder="Search conversations..."
                />
                <InputGroupAddon>
                  {" "}
                  <InputGroupButton className="hover:bg-accent-soft">
                    <Search color="#64748B" />
                  </InputGroupButton>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end" className="text-secondary">
                  {" "}
                  12 results
                </InputGroupAddon>
              </InputGroup>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <Chat
            chats={["Analyze Bitcoin Market ", "What is RAG?", "Create my CV"]}
            label="RECENT"
          />
        </SidebarGroup>

        <SidebarGroup>
          <Chat
            chats={[
              "Crypto market Analysis",
              "improve my resume",
              "Explain RAG architecture",
              "Crypto market Analysis",
              "improve my resume",
              "Explain RAG architecture",
              "Crypto market Analysis",
              "improve my resume",
              "Explain RAG architecture",
              "Crypto market Analysis",
              "improve my resume",
              "Explain RAG architecture",
              "Crypto market Analysis",
              "improve my resume",
              "Explain RAG architecture",
              "Crypto market Analysis",
              "improve my resume",
              "Explain RAG architecture",
            ]}
            label="OLDER"
          />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

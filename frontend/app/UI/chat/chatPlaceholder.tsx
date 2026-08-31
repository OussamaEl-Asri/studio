import { MessageScrollerItem } from "@/components/ui/message-scroller";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

import { MessageType } from "@/app/seed/chat";

export const ChatPlaceholder = ({ messages }: { messages: MessageType[] }) => {
  return (
    <MessageScrollerItem>
      {messages.map((message, ind) => {
        const avatar = message.role === "user" ? "JD" : "Bot";
        const align = message.role === "user" ? "end" : "start";
        return (
          <Message key={ind + 1} align={align}>
            <MessageAvatar className="mb-10 mt-auto bg-main">
              {message.role === "user" ? (
                <Avatar>
                  <AvatarImage> </AvatarImage>
                  <AvatarFallback className="bg-accent-soft">
                    {avatar}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Bot color="#6366F1" />
              )}
            </MessageAvatar>
            <MessageContent className="mb-4">
              <Bubble>
                <BubbleContent>{message.content}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        );
      })}
    </MessageScrollerItem>
  );
};

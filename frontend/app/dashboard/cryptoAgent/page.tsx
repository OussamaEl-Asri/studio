import { Card, CardContent, CardFooter } from "@/components/ui/card";

import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

import { routeIcons } from "@/app/lib/utils";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

import { Header } from "@/app/UI/card/cardHeader";
import { Footer } from "@/app/UI/card/cardFooter";
import { ChatPlaceholder } from "@/app/UI/chat/chatPlaceholder";

import { chats } from "@/app/seed/chat";

export default function Home() {
  const isEmpty: boolean = true;
  return (
    <MessageScrollerProvider>
      <Card className=" h-screen max-h-screen rounded-none bg-main pt-0">
        <Header
          title="Crypto Agent"
          Icon={routeIcons["/dashboard/cryptoAgent"]}
          description="Analyze cryptocurrency markets using technical indicators and market
        data."
        />
        <CardContent className="flex-1 min-h-0">
          {isEmpty ? (
            <Empty className="text-center mt-30">
              <EmptyHeader>
                <EmptyTitle className="text-3xl text-primary">
                  What’s on your mind today?
                </EmptyTitle>
                <EmptyDescription className="text-secondary">
                  Explore cryptocurrencies, market trends, and technical
                  indicators with an AI-powered assistant.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <MessageScroller className="h-full min-h-0">
              <MessageScrollerViewport>
                <MessageScrollerContent className="gap-2">
                  {chats.map((chat, ind) => (
                    <ChatPlaceholder key={ind} messages={chat.messages} />
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
            </MessageScroller>
          )}
        </CardContent>
        <CardFooter
          className="bg-card mt-auto mb-0 flex-col gap-5 
        justify-center items-center shrink-0"
        >
          <Footer />
          <div className="text-secondary text-[12px] mr-auto ml-90">
            AI can make mistakes. Check important information.
          </div>
        </CardFooter>
      </Card>
    </MessageScrollerProvider>
  );
}

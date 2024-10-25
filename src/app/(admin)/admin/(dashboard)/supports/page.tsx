"use client";
import ChatSupport from "@/components/chat-support";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Input } from "@/components/ui/input";
import { COMMONS_CONST } from "@/constants/commons";
import { useGetConversation } from "@/hooks/query-chats/useGetConversation";
import { useGetMessages } from "@/hooks/query-chats/useGetMessages";
import { useGetMeUser } from "@/hooks/query-users/useGetMeUser";
import { extractTime } from "@/utils/common";
import { Send } from "lucide-react";
import React from "react";

const SupportsPage = () => {
  const { data: user } = useGetMeUser();
  const [select, setSelect] = React.useState<string>("");

  const { data: conversations } = useGetConversation(user?._id ?? "");
  const { data: messages } = useGetMessages(select, user?._id ?? "");

  console.log("conversations", conversations);

  const handleSelectMessage = (id: string) => {
    setSelect(id);
  };

  return (
    <div className="mt-4 flex min-h-[600px] w-full rounded-lg bg-slate-200">
      <div className="flex w-auto flex-col gap-4 overflow-y-auto border-r border-r-slate-400 p-4">
        <Input placeholder="tìm kiếm theo email" />
        {conversations?.map((item) =>
          item.participants
            .filter((par) => par.id !== user?._id)
            .map((parM) => (
              <Button
                variant={"ghost"}
                key={parM.id}
                onClick={() => handleSelectMessage(parM.id)}
                className="flex cursor-pointer items-center justify-start gap-2 rounded-xl text-black hover:bg-stone-900 hover:text-white"
              >
                <ChatBubbleAvatar fallback="AI" />
                <h1 className="text-lg font-bold">{parM.email}</h1>
              </Button>
            )),
        )}
      </div>
      <div className="flex-grow">
        <ChatMessageList>
          {messages?.messages.map((message) => (
            <ChatBubble
              variant={message.sender.id === user?._id ? "sent" : "received"}
              key={message._id}
            >
              <ChatBubbleAvatar
                className="bg-transparent"
                fallback={message.sender.id === user?._id ? "👨‍💻" : "🧔‍♀️"}
              />
              <ChatBubbleMessage className="flex flex-col gap-2">
                <h1 className="text-sm font-bold">
                  {message.sender.id === user?._id
                    ? user?.email
                    : COMMONS_CONST.EMAIL_ADMIN}
                </h1>
                <p className="text-xs">{message.message}</p>
                <p className="ml-auto text-xs">
                  {extractTime(message.created_at)}
                </p>
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" />
            <ChatBubbleMessage>Hey there</ChatBubbleMessage>
          </ChatBubble>
          <div className="mt-auto flex items-center gap-2">
            <ChatInput
              placeholder="viết tin nhắn ở đây"
              className="text-black"
            />
            <Button className="hover:bg-sky-500" size="icon">
              <Send className="size-4" />
            </Button>
          </div>
        </ChatMessageList>
      </div>
    </div>
  );
};

export default SupportsPage;

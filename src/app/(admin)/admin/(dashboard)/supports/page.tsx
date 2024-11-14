"use client";
import { chatSocket } from "@/api/socket";
import PageContainer from "@/components/admin/page-container";
import ChatSupport from "@/components/chat-support";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import MessageLoading from "@/components/ui/chat/message-loading";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { COMMONS_CONST } from "@/constants/commons";
import { useGetConversation } from "@/hooks/query-chats/useGetConversation";
import { useGetMessages } from "@/hooks/query-chats/useGetMessages";
import { useGetMeUser } from "@/hooks/query-users/useGetMeUser";
import { Conversation } from "@/types/conversation.type";
import { Message } from "@/types/message.type";
import { extractTime } from "@/utils/common";
import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { Send } from "lucide-react";
import { BiMessageX } from "react-icons/bi";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const SupportsPage = () => {
  const { data: user } = useGetMeUser();
  const [select, setSelect] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [initialConversations, setInitialConversations] = useState<
    Conversation[]
  >([]);
  const queryClient = useQueryClient();

  const { data: conversations } = useGetConversation(user?._id ?? "");
  const { data: messages } = useGetMessages(select, user?._id ?? "");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const emitTyping = debounce((value) => {
    if (user) {
      if (value !== "") {
        chatSocket.emit("typing", user._id);
      } else {
        chatSocket.emit("notyping", user._id);
      }
    }
  }, 300);

  const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    emitTyping(e.target.value);
  };

  const handleChat = () => {
    if (user) {
      chatSocket.emit("send-messages", {
        sender: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        receiver: {
          id: select,
        },
        message: value,
      });
      setValue("");
      console.log("select", select);
      queryClient.refetchQueries({ queryKey: ["messages", select] });
    }
  };

  const handleSelectMessage = (id: string) => {
    setSelect(id);
  };

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const updatedConversations = initialConversations.map((conversation) => {
      const filteredParticipants = conversation.participants.filter(
        (participant) =>
          participant.email.toLowerCase().includes(search.toLowerCase()),
      );
      return {
        _id: conversation._id,
        participants: filteredParticipants,
        messages: conversation.messages,
        created_at: conversation.created_at,
      };
    });
    if (search === "") {
      setInitialConversations(conversations ?? []);
      return;
    }
    setInitialConversations(updatedConversations);
  };

  useEffect(() => {
    if (conversations && conversations?.length > 0) {
      setInitialConversations(conversations);
    }
  }, [conversations]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const refetchChat = (data: Message) => {
      if (data.receiver.id == user?._id) {
        queryClient.refetchQueries({ queryKey: ["messages"] });
        setIsTyping(false);
      }
    };

    const typingChat = (id: string) => {
      if (id == select) {
        setIsTyping(true);
      }
    };
    const noTypingChat = (id: string) => {
      if (id == select) {
        setIsTyping(false);
      }
    };

    chatSocket.on("receive-messages", refetchChat);
    chatSocket.on("typing", typingChat);
    chatSocket.on("notyping", noTypingChat);

    return () => {
      chatSocket.off("receive-messages", refetchChat);
      chatSocket.off("typing", typingChat);
      chatSocket.off("notyping", noTypingChat);
    };
  }, [select]);

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold">{COMMONS_CONST.SUPPORT}</h1>
      <div className="mt-4 flex h-[580px] w-full rounded-lg bg-slate-200">
        <div className="flex w-1/3 flex-col gap-2 border-r border-r-slate-400">
          <div className="p-2">
            <Input
              onChange={handleSearchValue}
              className="text-black"
              placeholder="tìm kiếm theo email"
            />
          </div>
          <ScrollArea className="h-[550px]">
            {initialConversations?.map((item) =>
              item.participants
                .filter((par) => par.id !== user?._id)
                .map((parM) => (
                  <Button
                    variant={"ghost"}
                    key={parM.id}
                    onClick={() => handleSelectMessage(parM.id)}
                    className={`${select === parM.id && "bg-stone-300"} my-3 flex w-full cursor-pointer items-center justify-start gap-2 p-0 px-2 text-black hover:bg-stone-300 hover:text-black`}
                  >
                    <ChatBubbleAvatar
                      className="text-stone-500"
                      fallback="CUS"
                    />
                    <h1 className="text-lg font-bold">{parM.email}</h1>
                  </Button>
                )),
            )}
          </ScrollArea>
        </div>
        <div className="flex w-2/3 flex-col">
          {messages ? (
            <>
              <ScrollArea className="w-full">
                {messages.messages.map((message) => (
                  <div
                    key={message._id}
                    className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4"
                  >
                    <ChatBubble
                      variant={
                        message.sender.id === user?._id ? "sent" : "received"
                      }
                    >
                      <ChatBubbleAvatar
                        className="bg-transparent"
                        fallback={message.sender.id === user?._id ? "👨‍💻" : "🧔‍♀️"}
                      />
                      <ChatBubbleMessage className="flex w-full flex-col">
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
                  </div>
                ))}
                {isTyping && (
                  <ChatBubble className="p-4">
                    <ChatBubbleAvatar
                      className="bg-transparent"
                      fallback="🧔‍♀️"
                    ></ChatBubbleAvatar>
                    <ChatBubbleMessage>
                      <MessageLoading />
                    </ChatBubbleMessage>
                  </ChatBubble>
                )}
                <div ref={messagesEndRef} />
              </ScrollArea>
              <div className="sticky bottom-0 flex items-center gap-2 bg-slate-200">
                <ChatInput
                  value={value}
                  onChange={handleSetValue}
                  placeholder="viết tin nhắn ở đây"
                  className="flex-grow bg-slate-50 text-black"
                />
                <Button
                  className="hover:bg-sky-500"
                  onClick={handleChat}
                  size="icon"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex h-full justify-center">
              <span className="flex items-center gap-2 text-black">
                Vui lòng chọn hộp thoại của bạn
                <BiMessageX size={30} />
              </span>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default SupportsPage;

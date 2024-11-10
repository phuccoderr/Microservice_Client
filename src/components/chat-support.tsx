"use client";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { RiAdminFill } from "react-icons/ri";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { useGetMessages } from "@/hooks/query-chats/useGetMessages";
import { COMMONS_CONST } from "@/constants/commons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { chatSocket } from "@/api/socket";
import { Message } from "@/types/message.type";
import { useQueryClient } from "@tanstack/react-query";
import MessageLoading from "@/components/ui/chat/message-loading";
import { extractTime } from "@/utils/common";

export default function ChatSupport() {
  const [value, setValue] = useState("");
  const { data: me } = useGetMe();
  const { data: messages } = useGetMessages(
    me?._id ?? "",
    COMMONS_CONST.ID_ADMIN,
  );
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (me) {
      if (e.target.value != "") {
        chatSocket.emit("typing", me._id);
      } else {
        chatSocket.emit("notyping", me._id);
      }
    }
  };

  const handleChat = () => {
    if (me) {
      chatSocket.emit("send-messages", {
        sender: {
          id: me._id,
          name: me.first_name + " " + me.last_name,
          email: me.email,
        },
        receiver: {
          id: COMMONS_CONST.ID_ADMIN,
          name: COMMONS_CONST.NAME_ADMIN,
          email: COMMONS_CONST.EMAIL_ADMIN,
        },
        message: value,
      });
      setValue("");
    }
    queryClient.refetchQueries({ queryKey: ["messages"] });
  };

  useEffect(() => {
    const refetchChat = (data: Message) => {
      if (data.receiver.id == me?._id) {
        queryClient.refetchQueries({ queryKey: ["messages"] });
        setIsTyping(false);
      }
    };
    const typingChat = (id: string) => {
      if (id == COMMONS_CONST.ID_ADMIN) {
        setIsTyping(true);
      }
    };

    const noTypingChat = (id: string) => {
      if (id == COMMONS_CONST.ID_ADMIN) {
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
  }, [me]);

  return me ? (
    <ExpandableChat
      size="sm"
      position="bottom-right"
      className="rounded-full bg-white"
    >
      <ExpandableChatHeader className="flex-col justify-center text-center">
        <h1 className="flex items-center gap-2 text-lg font-semibold">
          Nhắn tin với quản trị viên <RiAdminFill />
        </h1>
        <p className="text-sm">
          Vui lòng gửi câu hỏi với quản trị viên, chúng tôi sẽ trả lời nhanh
          chóng nhất có thể!
        </p>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList ref={messagesEndRef}>
          {messages?.messages.map((message) => (
            <ChatBubble
              variant={message.sender.id === me?._id ? "sent" : "received"}
              key={message._id}
            >
              <ChatBubbleAvatar
                className="bg-transparent"
                fallback={message.sender.id === me?._id ? "👨‍💻" : "🧔‍♀️"}
              />
              <ChatBubbleMessage className="flex flex-col gap-2">
                <h1 className="text-sm font-bold">
                  {message.sender.id === me?._id
                    ? me.email
                    : COMMONS_CONST.EMAIL_ADMIN}
                </h1>
                <p className="text-xs">{message.message}</p>
                <p className="ml-auto text-xs">
                  {extractTime(message.created_at)}
                </p>
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {isTyping && (
            <ChatBubble>
              <ChatBubbleAvatar
                className="bg-transparent"
                fallback="🧔‍♀️"
              ></ChatBubbleAvatar>
              <ChatBubbleMessage>
                <MessageLoading />
              </ChatBubbleMessage>
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter className="flex items-center gap-2">
        <ChatInput
          value={value}
          onChange={handleSetValue}
          placeholder="viết tin nhắn ở đây"
          className="p-2"
        />
        <Button className="hover:bg-sky-500" onClick={handleChat} size="icon">
          <Send className="size-4" />
        </Button>
      </ExpandableChatFooter>
    </ExpandableChat>
  ) : null;
}

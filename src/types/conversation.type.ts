import { Message } from "@/types/message.type";

export type Conversation = {
  _id: string;
  participants: string[];
  messages: Message[];
  created_at: string;
};

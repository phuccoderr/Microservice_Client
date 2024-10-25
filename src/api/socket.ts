import URL_CONST from "@/constants/api";
import { io } from "socket.io-client";

export const productSocket = io(URL_CONST.PRODUCT_SOCKET);
export const chatSocket = io(URL_CONST.CHAT_SOCKET);

import URL_CONST from "@/constants/api";
import { io } from "socket.io-client";

export const socket = io(URL_CONST.PRODUCT_SOCKET);

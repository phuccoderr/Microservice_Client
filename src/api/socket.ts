import URL_CONST from "@/constants/api";
import { io } from "socket.io-client";

export const productSocket = io(URL_CONST.PRODUCT_SOCKET);

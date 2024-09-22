import { useEffect } from "react";
import io from "socket.io-client";

export const ConnectSocket = (url: string) => {
  const socket = io(url);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return socket;
};

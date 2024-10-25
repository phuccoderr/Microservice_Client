import * as React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, ...props }, ref) => {
    const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, []);
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col gap-6 overflow-y-auto p-4",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
        <div ref={messagesEndRef} />
      </div>
    );
  },
);

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };

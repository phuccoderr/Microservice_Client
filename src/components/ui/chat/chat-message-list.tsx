import * as React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, ...props }, ref) => {
    React.useEffect(() => {
      if (ref) {
        ref?.current?.scrollTo({ top: ref.current.scrollHeight });
      }
    }, [children]);
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
      </div>
    );
  },
);

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };

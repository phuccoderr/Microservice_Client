import { chatsApi } from "@/api/chatsApi";
import { useQuery } from "@tanstack/react-query";

export const useGetConversation = (id: string) => {
  return useQuery({
    queryKey: ["conversation", id],
    queryFn: async () => {
      return await chatsApi.getConversation(id);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};

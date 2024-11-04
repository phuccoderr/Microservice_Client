import { mailsAxiosClient } from "@/api/axiosClient";
import { Feedback } from "@/types/feedback.type";

export const mailsApi = {
  sendMail(body: Feedback) {
    const url = "/feedback";
    return mailsAxiosClient.post(url, body);
  },
};

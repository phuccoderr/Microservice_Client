import ContactFeedback from "@/components/contact/feedback";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const ContactPage = () => {
  return (
    <div className="container w-full p-8">
      <div className="mx-12 flex gap-8">
        <div className="w-1/2">Map</div>
        <ContactFeedback />
      </div>
    </div>
  );
};

export default ContactPage;

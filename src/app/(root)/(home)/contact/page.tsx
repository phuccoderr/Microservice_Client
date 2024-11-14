import ContactFeedback from "@/components/contact/feedback";
import ContactImage from "@/public/images/contact_food.jpg";
import Image from "next/image";
import React from "react";

const ContactPage = () => {
  return (
    <div className="container w-full p-8">
      <div className="mx-12 flex gap-8">
        <Image
          src={ContactImage}
          width={700}
          alt="Contact food"
          className="h-[600px]"
        />
        <ContactFeedback />
      </div>
    </div>
  );
};

export default ContactPage;

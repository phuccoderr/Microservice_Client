"use client";
import TabInfo from "@/components/profile/tab-info";
import TabOrder from "@/components/profile/tab-order";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>("info");
  return (
    <div className="w-full p-4">
      <Tabs className="flex gap-20 p-4" defaultValue="account">
        <TabsList className="flex h-auto flex-col items-start justify-start gap-4 !bg-transparent text-black">
          <TabsTrigger className="w-full" value="account">
            Account
          </TabsTrigger>
          <TabsTrigger className="w-full" value="order">
            Order History
          </TabsTrigger>
        </TabsList>
        <div className="flex w-full flex-col items-center">
          <TabInfo value="account" />
          <TabOrder value="order" />
        </div>
      </Tabs>
    </div>
  );
};

export default ProfilePage;

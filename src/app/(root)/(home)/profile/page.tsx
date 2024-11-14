"use client";
import ModalOrderDetail from "@/components/profile/modal-order-detail";
import ModalPostReview from "@/components/profile/modal-post-review";
import TabInfo from "@/components/profile/tab-info";
import TabOrder from "@/components/profile/tab-order";
import TabProduct from "@/components/profile/tab-product";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>("account");
  return (
    <div className="w-full p-4">
      <Tabs
        className="flex gap-20 p-4"
        defaultValue={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="flex h-auto flex-col items-start justify-start gap-4 !bg-transparent text-black">
          <TabsTrigger
            className={`w-full ${activeTab === "account" ? "!bg-sky-300" : ""}`}
            value="account"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            className={`w-full ${activeTab === "order" ? "!bg-sky-300" : ""}`}
            value="order"
          >
            Lịch sử hoá đơn
          </TabsTrigger>
          <TabsTrigger
            className={`w-full ${activeTab === "product" ? "!bg-sky-300" : ""}`}
            value="product"
          >
            Lịch sử sản phẩm
          </TabsTrigger>
        </TabsList>
        <div className="flex w-full flex-col items-center">
          <TabInfo value="account" />
          <TabOrder value="order" />
          <TabProduct value="product" />
        </div>
      </Tabs>
      <ModalOrderDetail />
      <ModalPostReview />
    </div>
  );
};

export default ProfilePage;

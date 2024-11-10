"use client";
import LoadingGlobal from "@/components/admin/loading";
import PageContainer from "@/components/admin/page-container";
import { columns } from "@/components/orders/column";
import ModalOrderDetail from "@/components/profile/modal-order-detail";
import { DataTable } from "@/components/table/data-table";
import { useGetAllOrders } from "@/hooks/query-orders/useGetAllOrders";
import useDebounce from "@/hooks/useDebounce";
import React, { useState } from "react";

const OrdersPage = () => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(100);
  const debounced = useDebounce(keyword, 2000);
  const { data, isLoading } = useGetAllOrders({
    page: 1,
    limit: limit,
    sort: "asc",
    keyword: debounced,
  });
  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Manager Orders</h1>
        {isLoading ? (
          <LoadingGlobal />
        ) : (
          <DataTable
            columns={columns}
            data={data?.entities ?? []}
            setKeyword={setKeyword}
            keyword={keyword}
            limit={limit}
            setLimit={setLimit}
          />
        )}
      </div>
      <ModalOrderDetail />
    </PageContainer>
  );
};

export default OrdersPage;

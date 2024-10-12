"use client";
import LoadingGlobal from "@/components/admin/loading";
import { columns } from "@/components/discounts/column";
import { DataTable } from "@/components/table/data-table";
import { DISCOUNT_CONST } from "@/constants/discounts";
import { useGetAllDiscounts } from "@/hooks/query-discounts/useGetAllDiscounts";
import { ParamPagination } from "@/types/pagination.type";
import React, { useState } from "react";

const DiscountsPage = () => {
  const [pagination, setPagination] = useState<ParamPagination>({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  const { data, isLoading } = useGetAllDiscounts(pagination);
  return (
    <>
      <div className="flex w-full flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">{DISCOUNT_CONST.MANAGE}</h1>
        {isLoading ? (
          <LoadingGlobal />
        ) : (
          <DataTable
            columns={columns}
            data={data?.entities ?? []}
            pagination={pagination}
            setPagination={setPagination}
            routeCreate="/admin/discounts/create"
          />
        )}
      </div>
    </>
  );
};

export default DiscountsPage;

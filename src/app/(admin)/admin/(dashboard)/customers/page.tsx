"use client";
import { columns } from "@/components/cutomer/column";
import ModalViewCustomer from "@/components/cutomer/modal-view-customer";
import LoadingGlobal from "@/components/admin/loading";
import { DataTable } from "@/components/table/data-table";
import { CUSTOMER_CONST } from "@/constants/customers";
import { useGetAllCustomers } from "@/hooks/query-customers/useGetAllCustomers";
import { ParamPagination } from "@/types/pagination.type";
import { useState } from "react";

const CustomersPage = () => {
  const [pagination, setPagination] = useState<ParamPagination>({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  const { data, isLoading } = useGetAllCustomers(pagination);
  return (
    <>
      <div className="flex w-full flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">{CUSTOMER_CONST.MANAGE_CUSTOMER}</h1>
        {isLoading ? (
          <LoadingGlobal />
        ) : (
          <DataTable
            columns={columns}
            data={data?.entities ?? []}
            pagination={pagination}
            setPagination={setPagination}
          />
        )}
      </div>
      <ModalViewCustomer />
    </>
  );
};

export default CustomersPage;

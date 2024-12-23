"use client";
import { columns } from "@/components/cutomer/column";
import ModalViewCustomer from "@/components/cutomer/modal-view-customer";
import LoadingGlobal from "@/components/admin/loading";
import { DataTable } from "@/components/table/data-table";
import { CUSTOMER_CONST } from "@/constants/customers";
import { useGetAllCustomers } from "@/hooks/query-customers/useGetAllCustomers";
import { ParamPagination } from "@/types/pagination.type";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import PageContainer from "@/components/admin/page-container";

const CustomersPage = () => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(100);
  const debounced = useDebounce(keyword, 2000);
  const { data, isLoading } = useGetAllCustomers({
    page: 1,
    limit: limit,
    sort: "asc",
    keyword: debounced,
  });
  return (
    <PageContainer>
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold">{CUSTOMER_CONST.MANAGE_CUSTOMER}</h1>
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
      <ModalViewCustomer />
    </PageContainer>
  );
};

export default CustomersPage;

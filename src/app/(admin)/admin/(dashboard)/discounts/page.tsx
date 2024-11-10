"use client";
import LoadingGlobal from "@/components/admin/loading";
import PageContainer from "@/components/admin/page-container";
import { columns } from "@/components/discounts/column";
import ModalDelete from "@/components/modal-delete";
import { DataTable } from "@/components/table/data-table";
import { DISCOUNT_CONST } from "@/constants/discounts";
import { useDeleteDiscount } from "@/hooks/query-discounts/useDeleteDiscount";
import { useGetAllDiscounts } from "@/hooks/query-discounts/useGetAllDiscounts";
import useDebounce from "@/hooks/useDebounce";
import { useDiscountStore } from "@/store/useDiscountStore";
import React, { useState } from "react";

const DiscountsPage = () => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(100);
  const debounced = useDebounce(keyword, 2000);
  const { data, isLoading } = useGetAllDiscounts({
    page: 1,
    limit: limit,
    sort: "asc",
    keyword: debounced,
  });
  const { id, name, modalDelete, setModalDelete } = useDiscountStore();
  const { mutate } = useDeleteDiscount();

  return (
    <PageContainer>
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold">{DISCOUNT_CONST.MANAGE}</h1>
        {isLoading ? (
          <LoadingGlobal />
        ) : (
          <DataTable
            columns={columns}
            data={data?.entities ?? []}
            keyword={keyword}
            setKeyword={setKeyword}
            limit={limit}
            setLimit={setLimit}
            routeCreate="/admin/discounts/create"
          />
        )}
      </div>
      <ModalDelete
        id={id}
        name={name}
        title={DISCOUNT_CONST.DELETE}
        description={DISCOUNT_CONST.DELETE_DESCRIPTION}
        openModal={modalDelete}
        setModal={setModalDelete}
        mutate={mutate}
      />
    </PageContainer>
  );
};

export default DiscountsPage;

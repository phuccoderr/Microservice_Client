"use client";
import LoadingGlobal from "@/components/loading/loading";
import { columns } from "@/components/product/column";
import { DataTable } from "@/components/table/data-table";
import { PRODUCT_CONST } from "@/constants/products";
import { useGetAllProducts } from "@/hooks/query-products/useGetAllProducts";
import { ParamPagination } from "@/types/pagination.type";
import { useState } from "react";

const ProductPage = () => {
  const [pagination, setPagination] = useState<ParamPagination>({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  const { data, isLoading } = useGetAllProducts(pagination);

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{PRODUCT_CONST.MANAGE}</h1>
      {isLoading ? (
        <LoadingGlobal />
      ) : (
        <DataTable
          routeCreate="/admin/products/create"
          columns={columns}
          data={data?.entities ?? []}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </div>
  );
};
export default ProductPage;

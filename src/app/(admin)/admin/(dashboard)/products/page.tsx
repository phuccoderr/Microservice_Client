"use client";
import LoadingGlobal from "@/components/admin/loading";
import PageContainer from "@/components/admin/page-container";
import ModalDelete from "@/components/modal-delete";
import { columns } from "@/components/product/column";
import ModalViewProduct from "@/components/product/modal-view-product";
import SheetUpdateProduct from "@/components/product/sheet-update-product";
import { DataTable } from "@/components/table/data-table";
import { PRODUCT_CONST } from "@/constants/products";
import { useDeleteProduct } from "@/hooks/query-products/useDeleteProduct";
import { useGetAllProducts } from "@/hooks/query-products/useGetAllProducts";
import useDebounce from "@/hooks/useDebounce";
import { useProductStore } from "@/store/useProductStore";
import { useState } from "react";

const ProductPage = () => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(100);
  const debounced = useDebounce(keyword, 2000);
  const { data, isLoading } = useGetAllProducts({
    page: 1,
    limit: limit,
    sort: "asc",
    keyword: debounced,
  });
  const { modalDelete, setModalDelete, id, name } = useProductStore();
  const { mutate } = useDeleteProduct();

  return (
    <PageContainer>
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold">{PRODUCT_CONST.MANAGE}</h1>
        {isLoading ? (
          <LoadingGlobal />
        ) : (
          <DataTable
            routeCreate="/admin/products/create"
            columns={columns}
            data={data?.entities ?? []}
            keyword={keyword}
            setKeyword={setKeyword}
            limit={limit}
            setLimit={setLimit}
          />
        )}
      </div>
      <ModalViewProduct />
      <ModalDelete
        id={id}
        name={name}
        title={PRODUCT_CONST.DELETE}
        description={PRODUCT_CONST.DELETE_DESCRIPTION}
        openModal={modalDelete}
        setModal={setModalDelete}
        mutate={mutate}
      />
      <SheetUpdateProduct />
    </PageContainer>
  );
};
export default ProductPage;

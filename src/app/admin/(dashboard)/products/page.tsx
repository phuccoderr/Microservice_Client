"use client";
import LoadingGlobal from "@/components/loading/loading";
import ModalDelete from "@/components/modal/modal-delete";
import { columns } from "@/components/product/column";
import ModalViewProduct from "@/components/product/modal-view-product";
import SheetUpdateProduct from "@/components/product/sheet-update-product";
import { DataTable } from "@/components/table/data-table";
import { PRODUCT_CONST } from "@/constants/products";
import { useDeleteProduct } from "@/hooks/query-products/useDeleteProduct";
import { useGetAllProducts } from "@/hooks/query-products/useGetAllProducts";
import { useProductStore } from "@/store/useProductStore";
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
  const { modalDelete, setModalDelete, id, name } = useProductStore();
  const { mutate } = useDeleteProduct();

  return (
    <>
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
    </>
  );
};
export default ProductPage;

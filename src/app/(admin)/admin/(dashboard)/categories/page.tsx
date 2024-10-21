"use client";
import { columns } from "@/components/category/column";
import ModalUpdateCategory from "@/components/category/modal-update-category";
import LoadingGlobal from "@/components/admin/loading";
import { DataTable } from "@/components/table/data-table";
import CATEGORIES_CONST from "@/constants/categories";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import { useCategoryStore } from "@/store/useCategoryStore";
import { ParamPagination } from "@/types/pagination.type";
import { useEffect, useState } from "react";
import _ from "lodash";
import ModalDelete from "@/components/modal-delete";
import { useDeleteCategory } from "@/hooks/query-categories/useDeleteCategory";
import useDebounce from "@/hooks/useDebounce";

const CategoriesPage = () => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(100);
  const debounced = useDebounce(keyword, 2000);
  const { data, isLoading } = useGetAllCategories({
    page: 1,
    limit: limit,
    sort: "asc",
    keyword: debounced,
  });
  const { id, name, modalDelete, setModalDelete, setListCategory } =
    useCategoryStore();
  const { mutate } = useDeleteCategory();

  useEffect(() => {
    setListCategory(data?.entities ?? []);
  }, [data]);

  return (
    <>
      <div className="flex w-full flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">
          {CATEGORIES_CONST.MANAGE_CATEGORY}
        </h1>

        {isLoading ? (
          <LoadingGlobal />
        ) : (
          <DataTable
            routeCreate="/admin/categories/create"
            columns={columns}
            data={data?.entities ?? []}
            keyword={keyword}
            setKeyword={setKeyword}
            limit={limit}
            setLimit={setLimit}
          />
        )}
      </div>
      <ModalUpdateCategory />
      <ModalDelete
        id={id}
        name={name}
        title={CATEGORIES_CONST.DELETE}
        description={CATEGORIES_CONST.DELETE_DESCRIPTION}
        openModal={modalDelete}
        setModal={setModalDelete}
        mutate={mutate}
      />
    </>
  );
};
export default CategoriesPage;

"use client";
import { columns } from "@/app/admin/(dashboard)/categories/column";
import ModalUpdateCategory from "@/components/category/modalUpdateCategory";
import LoadingGlobal from "@/components/loading/loading";
import { DataTable } from "@/components/table/data-table";
import CATEGORIES_CONST from "@/constants/categories";
import { useGetAllCategories } from "@/hook/query-categories/useGetAllCategories";
import useModalCategory from "@/store/useModalCategory";
import { ParamPagination } from "@/types/pagination.type";
import { useEffect, useState } from "react";
import _ from "lodash";

const Categories = () => {
  const [pagination, setPagination] = useState<ParamPagination>({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  const { data, isLoading } = useGetAllCategories(pagination);
  const { setListCategory } = useModalCategory();

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
            columns={columns}
            data={data?.entities ?? []}
            pagination={pagination}
            setPagination={setPagination}
          />
        )}
      </div>
      <ModalUpdateCategory />
    </>
  );
};
export default Categories;

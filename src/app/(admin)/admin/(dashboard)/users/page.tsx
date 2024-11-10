"use client";

import { columns } from "@/components/user/column";
import { DataTable } from "@/components/table/data-table";
import { useGetAllUsers } from "@/hooks/query-users/useGetAllUsers";
import LoadingGlobal from "@/components/admin/loading";
import { useState } from "react";
import ModalUpdateUser from "@/components/user/modal-update-user";
import { useUserStore } from "@/store/useUserStore";
import ModalDelete from "@/components/modal-delete";
import { USER_CONST } from "@/constants/users";
import { useDeleteUser } from "@/hooks/query-users/useDeleteUser";
import useDebounce from "@/hooks/useDebounce";
import PageContainer from "@/components/admin/page-container";

const UsersPage = () => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(100);
  const debounced = useDebounce(keyword, 2000);
  const { data, isLoading } = useGetAllUsers({
    page: 1,
    limit: limit,
    sort: "asc",
    keyword: debounced,
  });
  const { modalDelete, setModalDelete, id, name } = useUserStore();
  const { mutate } = useDeleteUser();
  return (
    <PageContainer>
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold">{USER_CONST.MANAGE_USER}</h1>

        {isLoading ? (
          <LoadingGlobal />
        ) : (
          <DataTable
            routeCreate="/admin/users/create"
            columns={columns}
            data={data?.entities ?? []}
            keyword={keyword}
            setKeyword={setKeyword}
            limit={limit}
            setLimit={setLimit}
          />
        )}
      </div>
      <ModalUpdateUser />
      <ModalDelete
        id={id}
        name={name}
        title={USER_CONST.DELETE}
        description={USER_CONST.DELETE_USER}
        openModal={modalDelete}
        setModal={setModalDelete}
        mutate={mutate}
      />
    </PageContainer>
  );
};

export default UsersPage;

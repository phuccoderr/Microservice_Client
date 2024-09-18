"use client";

import { columns } from "@/app/admin/(dashboard)/users/column";
import { DataTable } from "@/components/table/data-table";
import { useGetAllUsers } from "@/hook/query-users/useGetAllUsers";
import LoadingGlobal from "@/components/loading/loading";
import { useState } from "react";
import ModalUpdateUser from "@/components/user/modal-update-user";
import { useUserStore } from "@/store/useUserStore";
import ModalDelete from "@/components/modal/modalDelete";
import { ParamPagination } from "@/types/pagination.type";
import { USER_CONST } from "@/constants/users";
import { useDeleteUser } from "@/hook/query-users/useDeleteUser";

const UsersPage = () => {
  const [pagination, setPagination] = useState<ParamPagination>({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  const { data, isLoading } = useGetAllUsers(pagination);
  const { modalDelete, setModalDelete, id, name } = useUserStore();
  const { mutate } = useDeleteUser();
  return (
    <>
      <div className="flex w-full flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">{USER_CONST.MANAGE_USER}</h1>

        {isLoading ? (
          <LoadingGlobal />
        ) : (
          <DataTable
            routeCreate="/admin/users/create"
            columns={columns}
            data={data?.entities ?? []}
            pagination={pagination}
            setPagination={setPagination}
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
    </>
  );
};

export default UsersPage;

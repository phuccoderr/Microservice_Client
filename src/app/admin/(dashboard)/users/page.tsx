"use client";

import { columns } from "@/app/admin/(dashboard)/users/column";
import { DataTable } from "@/components/table/data-table";
import { useGetAllUsers } from "@/hook/useGetAllUsers";
import LoadingGlobal from "@/components/loading/loading";
import { useState } from "react";
import ModalUpdateUser from "@/components/user/modalUpdateUser";
import useModalStore from "@/store/useModalStore";
import ModalDelete from "@/components/modal/modalDelete";
import { ParamPagination } from "@/types/pagination.type";
import { USER_CONST } from "@/constants/users";
import { useDeleteUser } from "@/hook/useDeleteUser";

const Users = () => {
  const [pagination, setPagination] = useState<ParamPagination>({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  const { data, isLoading } = useGetAllUsers(pagination);
  const { modalUserDelete, setModalUserDelete, id, name } = useModalStore();
  const { mutate } = useDeleteUser();
  return (
    <>
      <div className="flex w-full flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Manage Users</h1>

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
      <ModalUpdateUser />
      <ModalDelete
        id={id}
        name={name}
        title={USER_CONST.DELETE}
        description={USER_CONST.DELETE_USER}
        openModal={modalUserDelete}
        setModal={setModalUserDelete}
        mutate={mutate}
      />
    </>
  );
};

export default Users;

"use client";
import LoadingGlobal from "@/components/admin/loading";
import PageContainer from "@/components/admin/page-container";
import ModalDelete from "@/components/modal-delete";
import { columns } from "@/components/reviews/column";
import ModalViewReview from "@/components/reviews/modal-view-review";
import { DataTable } from "@/components/table/data-table";
import { REVIEWS_CONST } from "@/constants/reviews";
import { useDeleteReview } from "@/hooks/query-reviews/useDeleteReview";
import { useGetAllReviews } from "@/hooks/query-reviews/useGetAllReviews";
import useDebounce from "@/hooks/useDebounce";
import { useReviewStore } from "@/store/useReviewStore";
import React, { useState } from "react";

const ReviewsPage = () => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(100);
  const debounced = useDebounce(keyword, 2000);
  const { data, isLoading } = useGetAllReviews({
    page: 1,
    limit: limit,
    sort: "asc",
    keyword: debounced,
  });

  const { id, modalDelete, setModalDelete, name } = useReviewStore();
  const { mutate } = useDeleteReview();

  return (
    <PageContainer>
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-2xl font-bold">{REVIEWS_CONST.MANAGE}</h1>
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
          />
        )}
      </div>
      <ModalDelete
        id={id}
        name={name}
        title={REVIEWS_CONST.DELETE}
        description={REVIEWS_CONST.DELETE_DESCRIPTION}
        openModal={modalDelete}
        setModal={setModalDelete}
        mutate={mutate}
      />
      <ModalViewReview />
    </PageContainer>
  );
};

export default ReviewsPage;

import RatingReview from "@/components/rating-review";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMMONS_CONST } from "@/constants/commons";
import { REVIEWS_CONST } from "@/constants/reviews";
import { useGetReview } from "@/hooks/query-reviews/useGetReview";
import { useReviewStore } from "@/store/useReviewStore";
import React from "react";

const ModalViewReview = () => {
  const { id, modalView, setModalView } = useReviewStore();
  const { data: review } = useGetReview(id);

  return (
    <Dialog open={modalView} onOpenChange={setModalView}>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>{COMMONS_CONST.INFORMATION}</DialogTitle>
          <DialogDescription>
            {REVIEWS_CONST.VIEW_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <RatingReview initialValue={review?.rating ?? 1} readonly />
          <div className="grid gap-2">
            <Label htmlFor="title">Tiêu đề đánh giá</Label>
            <Input readOnly value={review?.headline ?? ""} id="title" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="review">Đánh giá của bạn</Label>
            <Textarea value={review?.comment ?? ""} readOnly id="review" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalViewReview;

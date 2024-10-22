import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { useCanReview } from "@/hooks/query-reviews/useCanReview";
import { usePostReviews } from "@/hooks/query-reviews/usePostReviews";
import { useAuthStore } from "@/store/useAuthStore";
import { useProductStore } from "@/store/useProductStore";
import { Star } from "lucide-react";
import React, { useState } from "react";

const ModalPostReview = () => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [headline, setHeadline] = useState("");
  const { setModalReview, modalReview, id } = useProductStore();
  const { customerId } = useAuthStore();
  const mutation = usePostReviews();
  const { data: canReview } = useCanReview(customerId, id);
  const handlePostRevew = () => {
    mutation.mutate({
      proId: id,
      body: {
        headline,
        comment,
        rating,
      },
    });
  };

  return (
    <Dialog open={modalReview} onOpenChange={setModalReview}>
      <DialogContent className="bg-white text-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Viết đánh giá của bạn</DialogTitle>
        </DialogHeader>
        {!canReview ? (
          <>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Tiêu đề đánh giá</Label>
              <Input
                onChange={(e) => setHeadline(e.target.value)}
                id="title"
                placeholder="Tóm tắt đánh giá của bạn"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="review">Đánh giá của bạn</Label>
              <Textarea
                onChange={(e) => setComment(e.target.value)}
                id="review"
                placeholder="Viết nội dung đánh giá của bạn ở đây"
              />
            </div>
            {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
            <Button
              disabled={mutation.isPending}
              onClick={handlePostRevew}
              className="bg-stone-700 text-white hover:bg-stone-800"
            >
              Hoàn tất đánh giá
            </Button>
          </>
        ) : (
          <div>Sản phẩm này bạn đã đánh giá rồi</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalPostReview;

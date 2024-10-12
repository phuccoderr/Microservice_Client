import BadgeStatus from "@/components/badge-status";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { COMMONS_CONST } from "@/constants/commons";
import { CUSTOMER_CONST } from "@/constants/customers";
import { useGetCustomer } from "@/hooks/query-customers/useGetCustomer";
import { useCustomerStore } from "@/store/useCustomerStore";
import ImageDefault from "@/public/images/product-empty.png";
import Image from "next/image";

const ModalViewCustomer = () => {
  const { id, modalView, setModalView } = useCustomerStore();
  const { data } = useGetCustomer(id);

  return (
    <Dialog open={modalView} onOpenChange={setModalView}>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>{COMMONS_CONST.INFORMATION}</DialogTitle>
          <DialogDescription>
            {CUSTOMER_CONST.VIEW_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h1>
              {COMMONS_CONST.NAME}: {data?.first_name + " " + data?.last_name}
            </h1>
            <h1>EMAIL: {data?.email}</h1>
            <h1>
              {COMMONS_CONST.ADDRESS}: {data?.address}
            </h1>
            <h1>
              {COMMONS_CONST.PHONE_NUMBER}: {data?.phone_number}
            </h1>
            <div className="flex items-center gap-2">
              <h1>Trạng thái:</h1>
              <BadgeStatus status={data?.status ?? false} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Image
              alt="Ảnh đại diện"
              src={data?.avatar || ImageDefault}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <h1>Ảnh đại diện</h1>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalViewCustomer;

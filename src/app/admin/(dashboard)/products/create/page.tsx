import ButtonBack from "@/components/button-back";
import { Form } from "@/components/ui/form";
import { PRODUCT_CONST } from "@/constants/products";

const CreatePage = () => {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{PRODUCT_CONST.CREATE}</h1>
      <ButtonBack url="/admin/products" />
      <div className="mx-auto"></div>
    </div>
  );
};

export default CreatePage;

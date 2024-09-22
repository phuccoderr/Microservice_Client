import { Button } from "@/components/ui/button";
import { COMMONS_CONST } from "@/constants/commons";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

interface ButtonBackProps {
  url: string;
}

const ButtonBack = ({ url }: ButtonBackProps) => {
  return (
    <Button className="w-[100px]">
      <Link href={url} className="flex">
        <IoMdArrowRoundBack className="mr-2 h-4 w-4" /> {COMMONS_CONST.BACK}
      </Link>
    </Button>
  );
};

export default ButtonBack;

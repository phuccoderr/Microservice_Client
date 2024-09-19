import { Button } from "@/components/ui/button";
import { COMMONS_CONST } from "@/constants/commons";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

interface ButtonBackProps {
  url: string;
}

const ButtonBack = ({ url }: ButtonBackProps) => {
  return (
    <Link href={url}>
      <Button className="min-w-[10%] max-w-[10%]">
        <IoMdArrowRoundBack className="mr-2 h-4 w-4" /> {COMMONS_CONST.BACK}
      </Button>
    </Link>
  );
};

export default ButtonBack;

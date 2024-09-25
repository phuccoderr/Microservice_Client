import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BiSolidTrashAlt } from "react-icons/bi";
interface ImageDeleteIconProps {
  image: {
    id: string;
    url: string;
  };
  onDelete?: (id: string) => void;
}
const ImageDeleteIcon = ({ image, onDelete }: ImageDeleteIconProps) => {
  return (
    <div className="relative inline-block">
      <Image
        src={image.url}
        alt={"Image"}
        width={100}
        height={100}
        className="rounded-lg object-cover"
      />
      <Button
        variant="destructive"
        size="sm"
        className="absolute right-1 top-1"
        aria-label="Delete image"
      >
        <BiSolidTrashAlt />
      </Button>
    </div>
  );
};

export default ImageDeleteIcon;

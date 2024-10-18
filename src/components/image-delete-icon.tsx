import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BiSolidTrashAlt } from "react-icons/bi";
interface ImageDeleteIconProps {
  id: string;
  image: {
    id: string;
    url: string;
  };
  onDelete?: (productId: string, imageId: string) => void;
}
const ImageDeleteIcon = ({ id, image, onDelete }: ImageDeleteIconProps) => {
  return (
    <div className="relative inline-block">
      <Image
        src={image.url}
        alt={"Image"}
        width={100}
        height={100}
        className="h-[100px] rounded-lg object-cover"
      />
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="absolute right-1 top-1"
        aria-label="Delete image"
        onClick={() => onDelete?.(id, image.id)}
      >
        <BiSolidTrashAlt />
      </Button>
    </div>
  );
};

export default ImageDeleteIcon;

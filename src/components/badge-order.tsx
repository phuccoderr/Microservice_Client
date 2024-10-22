import { Badge } from "@/components/ui/badge";
import { FiAlertCircle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";

interface BadgeStatusProps {
  status: string;
}

const BadgeOrder = ({ status }: BadgeStatusProps) => {
  let label;
  let bgColor;
  let icon;
  switch (status) {
    case "pending":
      label = "Đang xử lý";
      bgColor = "bg-stone-300";
      icon = <FiAlertCircle className="ml-2" />;
      break;
    case "complete":
      label = "Hoàn thành";
      bgColor = "bg-green-300";
      icon = <FaRegCircleCheck className="ml-2" />;
      break;
    case "cancel":
      label = "Đã hủy";
      bgColor = "bg-red-300";
      icon = <MdOutlineCancel className="ml-2" />;
      break;
    default:
      label = "Không xác định";
      break;
  }

  return (
    <Badge className={`${bgColor} `}>
      {label} {icon}
    </Badge>
  );
};

export default BadgeOrder;

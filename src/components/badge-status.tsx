import { Badge } from "@/components/ui/badge";

interface BadgeStatusProps {
  status: boolean;
}

const BadgeStatus = ({ status }: BadgeStatusProps) => {
  return (
    <Badge variant={status ? undefined : "destructive"}>
      {status ? "Hoạt động" : "Không hoạt động"}
    </Badge>
  );
};

export default BadgeStatus;

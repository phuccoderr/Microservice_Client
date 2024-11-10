import { SyncLoader } from "react-spinners";
import { COMMONS_CONST } from "@/constants/commons";

export default function LoadingGlobal() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-[500px] w-full flex-col items-center justify-center gap-4">
      <SyncLoader color={"#0ea5e9"} />
      <span>{COMMONS_CONST.LOADING} 😚</span>
    </div>
  );
}

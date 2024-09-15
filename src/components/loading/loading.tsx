import {SyncLoader} from "react-spinners";
import {COMMONS_CONST} from "@/constants/commons";

export default function LoadingGlobal() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="flex w-full h-[500px] flex-col gap-4 items-center justify-center">
        <SyncLoader color={"green"} />
        <span>{COMMONS_CONST.LOADING} 😚</span>
    </div>
}
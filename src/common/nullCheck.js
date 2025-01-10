import { toast } from "@/common/toastMessage";

export const nullCheck = (checklist) => {
  let coptlist = [...checklist];
  let checksize = coptlist.length;
  for (let i = 0; i < checksize; i++) {
    let item = coptlist[i];

    let checkflag = false;

    if (typeof item.inval === "string") {
      checkflag =
        item.inval !== "" && item.inval !== null && item.inval !== undefined
          ? true
          : false;
    } else if (typeof item.inval === "number") {
      checkflag = item.inval !== 0 ? true : false;
    }

    if (!checkflag) {
      toast.error(item.msg);
      return false;
    }
  }

  return true;
};

import { toast, TypeOptions } from "react-toastify";

export const notify = (message: string, type: TypeOptions ) => {
    let cId = message.split(" ").join("");
    toast(message, {
    toastId: cId,
    type: type
  });
};

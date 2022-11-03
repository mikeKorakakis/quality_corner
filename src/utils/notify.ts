import { toast, TypeOptions } from "react-toastify";

interface Props {
  message: string;
  type: TypeOptions;
}
const toastArray: Array<[string, Date]> = [];

export const notify = ({ message, type }: Props) => {
  const length = toastArray.length;

  if (
    length > 0 &&
    toastArray[length - 1]?.[0] === message &&
    Number(new Date()) - Number(toastArray[length - 1]?.[1]) < 1000
  ) {
    console.log("cannot toast");
  } else {
    toast(message, {
      // toastId: cId,
      type: type,
    });
    toastArray.pop();
    toastArray.push([message, new Date()]);
  }
};

// import { ReactElement } from "react";

interface DProps {
  id?: string | number;
}
const DeleteForm = ({ id }: DProps) => {
  console.log(id);
  return <div>hello there</div>;
};

export default DeleteForm;

import EditForm from "./EditForm";
import { createSchema } from './../../types/zod/postCategory';

const createMessage = "Successfuly created!";
const editMessage = "Successfuly updated!";
const submitButtonText = "SUBMIT";

interface Props {
  id?: any;
}

const defaultValues = {
//   title: "",
//   body: "",
//   categoryId: "",
  date:  null,
//   published: false,
//   image: "",
//   error: null,
};

const fields = [
  { name: "title", type: "text", label: "Title", default: "" },
  { name: "body", type: "textarea", label: "Body", default: "" },
  { name: "categoryId", type: "select", label: "Category", default: "", router:"postCategory" },
  { name: "date", type: "date", label: "Date", default: new Date() || null },
  { name: "published", type: "checkbox", label: "Published", default: false },
  { name: "image", type: "file", label: "Image", default: "" },
];

const FeedEditForm = ({ id }: Props) => {
  return <EditForm
    id={id}
    router = "feed"
    createSchema={createSchema}
    fields={fields}
    defaultValues={defaultValues}
    createMessage={createMessage}
    editMessage={editMessage}
    submitButtonText={submitButtonText}
  />;
};

export default FeedEditForm;

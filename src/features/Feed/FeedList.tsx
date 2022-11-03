import Table from "../../core/components/Table/Table";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

const columns = new Map<string, string | JSX.Element>([
  ["title", "Title Header"],
  ["body", "Body Header"],
  ["published", "Published Header"],
  ["categoryId", "Category Header"],
  ["date", "Date Header"],
]);

const Feed = () => {
  return (
    <div className="not-prose mt-6 mb-10 overflow-x-auto">
      <Table
        router="feed"
        procedure="getAll"
        columnMap={columns}
        EditForm={EditForm}
        DeleteForm={DeleteForm}
      />
    </div>
  );
};

export default Feed;

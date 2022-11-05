import Table from "../../core/components/Table/Table";
import FeedEditForm from "./FeedEditForm";
import FeedDeleteForm from './FeedDeleteForm';

const columns = new Map<string, string>([
  ["title", "Title"],
  ["body", "Body"],
  ["published", "Published"],
  ["category", "Category"],
  ["date", "Date"],
]);

const Feed = () => {
  return (
    <div className="not-prose mt-6 mb-10 overflow-x-auto">
      <Table
        router="feed"
        procedure="getAll"
        columnMap={columns}
        EditForm={FeedEditForm}
        DeleteForm={FeedDeleteForm}
      />
    </div>
  );
};

export default Feed;

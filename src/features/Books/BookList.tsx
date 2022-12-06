import Table from "@/core/components/Table/Table";
import BookEditForm from "./BookEditForm";

const columns = new Map<string, string>([
  ["title", "ΤΙΤΛΟΣ"],
  ["description", "ΠΕΡΙΓΡΑΦΗ"],
  ["category", "ΚΑΤΗΓΟΡΙΑ"],
  ["fileUrl", "ΑΡΧΕΙΟ"],
]);

const Feed = () => {
  return (
    <div className="not-prose mt-6 mb-10 overflow-x-auto">
      <Table
        router="book"
        procedure="getAll"
        columnMap={columns}
        // EditForm={BookEditForm}
      />
    </div>
  );
};

export default Feed;

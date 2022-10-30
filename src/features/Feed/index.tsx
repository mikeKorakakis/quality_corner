import Table from "../../core/components/Table";
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';

const columns = new Map<string, string | JSX.Element>([
  ["title", "Title Header"],
  ["body", "Body Header"] 
]);

const Feed: React.FC = () => {
  return (
    <div className="flex items-center justify-center overflow-x-auto">
      <Table router="feed" procedure="getAll" columnMap={columns} EditForm={EditForm} DeleteForm={DeleteForm} />
    </div>
  );
};

export default Feed;

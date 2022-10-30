import Table from "../../core/components/Table";

const columns = new Map([
    ["title", "Title Header"],
    ["body", "Body Header"],
  ]);

const Feed: React.FC = () => {
  return <Table router="feed" procedure="getAll" columnMap={columns} />;
};

export default Feed;

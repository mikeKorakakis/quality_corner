import {
  createColumnHelper,
  PaginationState,
} from "@tanstack/react-table";
import { useMemo,  useState } from "react";
import Table from "../core/components/Table";
import { AppRouterOutputTypes } from "../utils/trpc";
import { trpc } from "../utils/trpc";

type FeedGetAllOutput = AppRouterOutputTypes["feed"]["getAll"];

const columnHelper = createColumnHelper<FeedGetAllOutput["data"][0]>();

const columns = [
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.body, {
    id: "body",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Body</span>,
    // footer: (info) => info.column.id,
  }),
//   columnHelper.display({
//   id:"actions",
//   cell: props => 'dellj'//<RowActions row={props.row} />,
//   }),
];
export default function Home() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const { isLoading, error, data } = trpc.feed.getAll.useQuery(
    fetchDataOptions,
    { keepPreviousData: true }
  ); 

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  if (isLoading) return <div>{"Loading..."}</div>;

  if (error) return <div>{"An error has occurred: " + error.message}</div>;
  return (
   <Table columns={columns} data={data} isLoading={isLoading} pagination={pagination} setPagination={setPagination}/>
  );
}

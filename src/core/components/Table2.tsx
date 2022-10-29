import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  Table as ReactTable,
  getFilteredRowModel,
  PaginationState,
  ColumnDef,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo, useReducer, useState } from "react";

interface Props<T> {
  data: { data: T[]; pageCount: number };
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  columns: ColumnDef<T, string>[];
  isLoading: boolean;
}

function Table2<T>(props: Props<T>) {
  const { data, pagination, setPagination, columns, isLoading } = props;
//   const rerender = useReducer(() => ({}), {})[1];
  const defaultData = useMemo(() => [], []);
  const [sorting, setSorting] = useState<SortingState>([])


  const table = useReactTable({
    data: data?.data ?? defaultData,
    pageCount: data?.pageCount ?? -1,
    state: {
      pagination,
    },
    columns,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return (
    <div className="overflow-x-auto bg-base-100">
      <table className="z-0 table w-fit">
      <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <tfoot>
        <tr className="flex py-2">
          <div className="btn-group bg-base-100 ml-2">
            <button className="btn btn-outline border-base-300">«</button>
            <button className="btn btn-outline border-base-300">{"<"}</button>
            <button className="btn btn-outline border-base-300">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </button>
            <button className="btn btn-outline border-base-300">{">"}</button>
            <button className="btn btn-outline border-base-300">»</button>
          </div>
          <span className="ml-4 flex items-center gap-1">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="input-bordered input input-md ml-2 w-20  focus:border-neutral-focus focus:outline-none focus:ring-0  "
            />
          </span>
          <select
            className="select-bordered select ml-4 w-min  focus:border-neutral-focus focus:outline-none focus:ring-0 "
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          {isLoading ? "Loading..." : null}
        </tr>
      </tfoot>

      {/* <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre> */}
    </div>
  );
}

export default Table2;

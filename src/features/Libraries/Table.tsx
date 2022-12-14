import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  ArrowRightCircleIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  Table as ReactTable,
  Column,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  ColumnDef,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppRouterOutputTypes } from "@/server/trpc/router/_app";
import { notify } from "@/utils/notify";
import { trpc } from "@/utils/trpc";
import Skeleton from "@/core/components/Layout/Skeleton";
import { Folder } from "@prisma/client";
import Button from "@/core/components/LoadingButton";
import clsx from "clsx";

// type GetKeys<U> = U extends Record<infer K, any> ? K : never;

// type UnionToIntersection<U extends object> = {
//   [K in GetKeys<U>]: U extends Record<K, infer T> ? T : never;
// };
// type Transformed = UnionToIntersection<test>
const router = "library";
const getAllProcedure = "getAll";
const getAllNoPaginationProcedure = "getAllNoPagination";
const updateProcedure = "updateMany";
interface Props {
  columnMap: Map<unknown, string>;
  role: string;
}

const defaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row, column: { id }, table }) => {
    if (id === "private") {
      // const originalRow = row.original;
      const initialValue = getValue() as boolean;

      const handleChange = (val: boolean) => {
        //   const updatedRow = {
        //     ...originalRow,
        //     private: val,
        //   };
        //   setUpdatedData((updatedData) => [
        //     ...updatedData.filter((x) => x.id !== originalRow.id),
        //     updatedRow,
        //   ]);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        table.options.meta?.updateData(row.index, id, val);
        // table.options.meta?.updateData(row.index, id, val);
        //   update({ ...originalRow, private: val, descripFtion: "dt" });
      };

      return (
        <input
          type="checkbox"
          className="checkbox ml-20"
          checked={initialValue ?? false}
          onChange={(e) => handleChange(e.target.checked)}
        />
      );
    } else if (id === "description") {
      // const originalRow = row.original;
      const initialValue = getValue() as string;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(initialValue);
      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        //   const updatedRow = {
        //     ...originalRow,
        //     description: value,
        //   };
        //   setUpdatedData((updatedData) => [
        //     ...updatedData.filter((x) => x.id !== originalRow.id),
        //     updatedRow,
        //   ]);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        table.options.meta?.updateData(row.index, id, value);

        //   value && update({ ...originalRow, description: value });
      };

      // If the initialValue is changed external, sync it up with our state
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <input
          className="input-bordered input w-52"
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    }
  },
};

export default function Home({ columnMap, role }: Props) {
  const [loading, setLoading] = useState(false);
  // GET CURRENT USER FROM NEXT-AUTH
  type ProcedureOutput =
    AppRouterOutputTypes[typeof router][typeof getAllProcedure];
  type DataType = ProcedureOutput["data"][0];
  //   type DataTypeKeys = UnionToIntersection<DataType>;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  //   const rerender = useReducer(() => ({}), {})[1];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [tableData, setTableData] = useState(() => data?.data);

  const fetchDataOptions = {
    pageIndex,
    pageSize,
    sorting,
    columnFilters,
  };
  const { isLoading, error, data } = trpc[router][getAllProcedure].useQuery(
    fetchDataOptions,
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const utils = trpc.useContext();

  const { mutate: update } = trpc[router][updateProcedure].useMutation({
    onSuccess() {
      utils[router][getAllProcedure].invalidate();
      utils[router][getAllNoPaginationProcedure].invalidate();
    },
    onError(error) {
      notify({ message: error.message, type: "error" });
    },
  });

  const handleSave = () => {
    setLoading(true);
    try {
      if (tableData) {
        update(tableData);
        //   update(updatedData);
        //   setUpdatedData([]);
        notify({
          message: "Επιτυχής αποθήκευση των δεδομένων",
          type: "success",
        });
      }
    } catch (err) {
      notify({
        message: "Σφάλμα κατά την αποθήκευση των δεδομένων",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const columnsArray = Array.from(columnMap);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const columnHelper = createColumnHelper<DataType>();
  const columns = columnsArray.map((innerArr) => {
    const key = innerArr[0] as any; // DataTypeKeys | "display";
    const title = innerArr[1] as string;
    if (key === "display") {
      return columnHelper.display({
        id: key,
        cell: () => title,
      });
    } else if (key === "private" || key === "description") {
      return columnHelper.accessor(key, {
        id: key,
        header: () => <span className="w-[4rem]">{title}</span>,
      });
    } else if (key === "index") {
      return columnHelper.display({
        id: key,
        header: () =>
          role === "admin" || role === "moderator" ? (
            <button
              ref={buttonRef}
              className={clsx("btn-primary btn w-48", loading && "loading")}
              //   disabled={updatedData.length === 0}
              onClick={handleSave}
              onMouseDown={() =>
                setTimeout(() => {
                  buttonRef?.current?.click();
                }, 400)
              }
            >
              ΑΠΟΘΗΚΕΥΣΗ
            </button>
          ) : (
            <span className="w-[4rem]">{title}</span>
          ),
        cell: (info) =>
          info?.table?.getSortedRowModel()?.flatRows?.indexOf(info?.row) +
          1 +
          pagination?.pageIndex * pagination?.pageSize,
      });
    } else {
      return columnHelper.accessor(key, {
        id: key.toString(),
        header: () => <span>{title}</span>,
        cell: (info) => {
          const value = info.getValue();
          if (key === "fileUrl" && !(role == "admin" || role == "moderator")) {
            const value = info.getValue();
            return <FileDownload filename={value as string} />;
          } else if (typeof value === "boolean") {
            return (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={value}
                  className="checkbox m-auto"
                />
              </div>
            );
          } else if (typeof value === "object" && value instanceof Date) {
            return <i>{value.toLocaleString().split(",")[0]}</i>;
          } else if (
            value &&
            typeof value === "object" &&
            value.hasOwnProperty("name")
          ) {
            return <i>{value["name"]}</i>;
          } else if (typeof value === "string" || typeof value === "number") {
            return <i>{value}</i>;
          }
        },
      });
    }
  });

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  function useSkipper() {
    const shouldSkipRef = useRef(true);
    const shouldSkip = shouldSkipRef.current;

    // Wrap a function with this to skip a pagination reset temporarily
    const skip = useCallback(() => {
      shouldSkipRef.current = false;
    }, []);

    useEffect(() => {
      shouldSkipRef.current = true;
    });

    return [shouldSkip, skip] as const;
  }

  useEffect(() => {
    setTableData(data?.data);
  }, [data?.data]);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data: tableData ?? defaultData,
    defaultColumn,
    pageCount: data?.pageCount ?? -1,
    state: {
      pagination,
      columnFilters,
      globalFilter,
      sorting,
    },
    columns,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    debugTable: true,
    // sortDescFirst: true,
    initialState: {
      sorting: [{ id: "title", desc: true }],
    },
    meta: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      updateData: (rowIndex: number, columnId: number, value: string) => {
        // Skip age index reset until after next rerender
        skipAutoResetPageIndex();
        setTableData(
          (old: any) =>
            old &&
            old.map((row: any, index: number) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex]!,
                  [columnId]: value,
                };
              }
              return row;
            })
        );
      },
    },
  });

  return (
    <table className="z-0 m-auto table w-fit rounded-3xl shadow-lg">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ArrowUpCircleIcon className="ml-2 inline w-5" />
                          ),
                          desc: (
                            <ArrowDownCircleIcon className="ml-2 inline w-5" />
                          ),
                        }[header.column.getIsSorted() as string] ??
                          (header.column.getCanSort() ? (
                            <ArrowRightCircleIcon className="ml-2 inline w-5" />
                          ) : null)}
                      </div>
                      <div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    </>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {isLoading ? (
          <Skeleton />
        ) : (
          table
            .getRowModel()
            .rows.slice(0, pagination.pageSize)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, i) => {
                    return i === 0 ? (
                      <th key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </th>
                    ) : (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
        )}
      </tbody>
      <tfoot className=" rounded-b-3xl">
        <tr className="w-full py-2">
          <th></th>
          <th colSpan={20}>
            <div className="mb-1 text-[1rem]">
              # ΑΠΟΤΕΛΕΣΜΑΤΑ: {data?.folderCount ?? 0}
            </div>
            <div className="btn-group ml-2  ">
              <button
                className="btn-outline btn border-base-300 bg-base-100"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                «
              </button>
              <button
                className="btn-outline btn border-base-300 bg-base-100"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>
              <button className="btn-outline btn border-base-300 bg-base-100">
                {table.getState().pagination.pageIndex + 1} ΑΠΟ{" "}
                {table.getPageCount()}
              </button>
              <button
                className="btn-outline btn border-base-300 bg-base-100"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>
              <button
                className="btn-outline btn border-base-300 bg-base-100"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                »
              </button>
            </div>
            <span className="ml-4  items-center gap-1 ">
              ΣΕΛΙΔΑ:
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
              {[10, 20, 30, 40, 50, 75, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  ΜΕΓΕΘΟΣ ΣΕΛ. {pageSize}
                </option>
              ))}
            </select>
            {/* <div>
                <button onClick={() => rerender()}>Force Rerender</button>
              </div> */}
            {isLoading ? "Loading..." : null}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

{
  /* <div>{table.getRowModel().rows.length} Rows</div>
<div>
  <button onClick={() => rerender()}>Force Rerender</button>
</div>
<pre>{JSON.stringify(pagination, null, 2)}</pre> */
}
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: ReactTable<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column, firstValue]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="input-bordered input input-sm mt-2 focus:border-neutral-focus focus:outline-none focus:ring-0 "
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="input-bordered input input-sm mt-2 focus:border-neutral-focus focus:outline-none focus:ring-0 "
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any, i) => (
          <option value={value} key={i} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Αναζήτηση... (${column.getFacetedUniqueValues().size})`}
        className="input-bordered input input-sm mt-2 focus:border-neutral-focus focus:outline-none focus:ring-0 "
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

const FileDownload = ({ filename }: { filename: string }) => {
  return (
    <div>
      {filename ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // onClick={() => agent.BookEditions.getBookFile(id, filename)}
          href={"/" + filename.replace("public/", "")}
          className="btn btn-success btn-md btn-circle ml-[40%]"

          // className="inline-flex items-center rounded-full border border-transparent bg-primary-600 p-1 text-black shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ArrowDownTrayIcon className="h-6 w-6" aria-hidden="true" />
        </a>
      ) : (
        <a className="btn btn-error btn-md btn-circle  ml-[40%]">
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </a>
      )}
    </div>
  );
};

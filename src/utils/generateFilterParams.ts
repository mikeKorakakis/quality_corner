import { GetAllSchemaType } from "@/types/zod/general";

export const generateFilterParams = (input: GetAllSchemaType) => {
    let colFilters: Array<{ [x: string]: { contains: string } }> = [];
  
    let sorting: Array<{ [x: string]: "asc" | "desc" }> = [{ id: "desc" }];
  
    if (input.columnFilters && input.columnFilters.length > 0) {
      colFilters = input.columnFilters.map((f) => {
        return f && typeof f.value === "string"
          ? { [f.id]: { contains: f.value } }
          : {};
      });
    }
    if (input.sorting && input.sorting.length > 0) {
      sorting = input.sorting.map((f) => {
        return f ? { [f.id]: f.desc ? "desc" : "asc" } : {};
      });
    }
    return { colFilters, sorting };
  };
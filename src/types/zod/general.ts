import { z } from "zod";

export const getAllSchema = z.object({
  pageIndex: z.number().min(0).optional().default(0),
  pageSize: z.number().min(1).max(1000).optional().default(10),
  sorting: z.array(z.object({ id: z.string(), desc: z.boolean() }).optional()),
  columnFilters: z.array(
    z.object({ id: z.string(), value: z.unknown() }).optional()
  ),
});

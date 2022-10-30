import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { procedureTypes } from "@trpc/server";

export const feedRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        pageIndex: z.number().min(0).optional().default(0),
        pageSize: z.number().min(1).max(50).optional().default(10),
        sorting: z.array(
          z.object({ id: z.string(), desc: z.boolean() }).optional()
        ),
        columnFilters: z.array(
          z.object({ id: z.string(), value: z.unknown() }).optional()
        ),
      })
    )
    .query(async ({ input, ctx }) => {
      let colFilters: Array<{ [x: string]: { contains: string } }> = [];

      let sorting: Array<{ [x: string]: "asc" | "desc" }> = [];

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

      const postCount = await ctx.prisma.post.count();
      const posts = await ctx.prisma.post.findMany({
        where: {
          AND: colFilters,
        },
        skip: input.pageIndex * input.pageSize,
        take: input.pageSize,
        orderBy: sorting,
      });

      return { data: posts, pageCount: postCount };
    }),
  get: publicProcedure
    .input(z.object({id: z.number()})
    )
    .query(async ({ input, ctx }) => {
      return ctx.prisma.post.findUnique({ where: { id: input.id } });
    }),
});

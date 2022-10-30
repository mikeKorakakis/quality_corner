import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const feedRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        pageIndex: z.number().min(0).optional().default(0),
        pageSize: z.number().min(1).max(50).optional().default(10),
        sorting: z.array(
          z.object({
            id: z.string(),
            desc: z.boolean(),
          })
        ),
        columnFilters: z.array(
          z.object({
            id: z.string(),
            value: z.string(),
          })
        ),
      })
    )
    .query(async ({ input, ctx }) => {
      let colFilters: Array<{
        [x: string]: {
          contains: string;
        };
      }> = [];


      let sorting: Array<{
        [x: string]:  'asc' | 'desc'}> = [];

      if (input.columnFilters && input.columnFilters.length > 0) {
        colFilters = input.columnFilters.map((f) => {
          return { [f.id]: { contains: f.value } };
        });
      }

      if (input.sorting && input.sorting.length > 0) {
        sorting = input.sorting.map((f) => {
          return { [f.id]:  f.desc ? 'desc' : 'asc' };
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
});
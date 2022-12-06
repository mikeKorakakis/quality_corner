import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { getAllSchema } from "@/types/zod/general";
import { deleteSchema, createSchema, updateSchema } from "@/types/zod/book";
import { getSchema } from "@/types/zod/feed";
import { delay } from "@/utils/delay";
import { generateFilterParams } from "@/utils/generateFilterParams";

export const bookRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ input, ctx }) => {
    const { colFilters, sorting } = generateFilterParams(input);
    const bookCount = await ctx.prisma.book.count({
      where: {
        AND: colFilters,
      },
    });
    const books = await ctx.prisma.book.findMany({
      where: {
        AND: colFilters,
      },
      skip: input.pageIndex * input.pageSize,
      take: input.pageSize,
      orderBy: sorting,
    });

    const pageCount = Math.ceil(bookCount / input.pageSize);
    return { data: books, pageCount };
  }),

  get: publicProcedure.input(getSchema).query(async ({ input, ctx }) => {
    delay(2000);
    return ctx.prisma.post.findUnique({ where: { id: input.id } });
  }),

  update: publicProcedure
    .input(updateSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.post.update({ where: { id: input.id }, data: input });
    }),

 
});

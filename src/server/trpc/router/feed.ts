import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { getAllSchema } from "@/types/zod/general";
import { deleteSchema, createSchema, updateSchema } from "@/types/zod/feed";
import { getSchema } from "@/types/zod/feed";
import { delay } from "@/utils/delay";
import { generateFilterParams } from "@/utils/generateFilterParams";

export const feedRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ input, ctx }) => {
    const { colFilters, sorting } = generateFilterParams(input);
    const postCount = await ctx.prisma.post.count({
      where: {
        AND: colFilters,
      },
    });
    const posts = await ctx.prisma.post.findMany({
      where: {
        AND: colFilters,
      },
      include: {
        category: true,
      },
      skip: input.pageIndex * input.pageSize,
      take: input.pageSize,
      orderBy: sorting,
    });

    const pageCount = Math.ceil(postCount / input.pageSize);
    return { data: posts, pageCount };
  }),

  get: publicProcedure.input(getSchema).query(async ({ input, ctx }) => {
    delay(2000);
    return ctx.prisma.post.findUnique({ where: { id: input.id } });
  }),

  create: publicProcedure
    .input(createSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx?.session?.user?.id) {
        throw new TRPCError({ message: "Not logged in", code: "FORBIDDEN" });
      }
      const authorId = ctx?.session?.user?.id;
      const inputWithUserId = { ...input, authorId };
      return ctx.prisma.post.create({ data: inputWithUserId });
    }),

  update: publicProcedure
    .input(updateSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.post.update({ where: { id: input.id }, data: input });
    }),

  delete: publicProcedure
    .input(deleteSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.post.delete({ where: { id: input.id } });
    }),
});

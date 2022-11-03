import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { getAllSchema } from "../../../types/zod/general";
import { deleteSchema,createSchema, updateSchema } from "../../../types/zod/feed";
import { getSchema } from './../../../types/zod/feed';
import { delay } from "../../../utils/delay";


export const feedRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ input, ctx }) => {
    let colFilters: Array<{ [x: string]: { contains: string } }> = [];

    let sorting: Array<{ [x: string]: "asc" | "desc" }> = [{id:'desc'}];

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

    const postCount = await ctx.prisma.post.count({
      where: {
        AND: colFilters,
      },
    });
    const posts = await ctx.prisma.post.findMany({
      where: {
        AND: colFilters,
      },
      skip: input.pageIndex * input.pageSize,
      take: input.pageSize,
      orderBy: sorting,
    });

    const pageCount = Math.ceil(postCount / input.pageSize);
    return { data: posts, pageCount };
  }),

  get: publicProcedure
    .input(getSchema).query(async ({ input, ctx }) => {
        delay(2000)
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
      return ctx.prisma.post.delete({ where: { id: input.id }});
    }),
});

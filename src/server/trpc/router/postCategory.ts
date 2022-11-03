import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getAllSchema } from "../../../types/zod/general";
import {
  deleteSchema,
  createSchema,
  getSchema,
  updateSchema,
} from "../../../types/zod/postCategory";

export const postCategoryRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ input, ctx }) => {
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

    const postCategoryCount = await ctx.prisma.postCategory.count({
      where: {
        AND: colFilters,
      },
    });
    const postCategories = await ctx.prisma.postCategory.findMany({
      where: {
        AND: colFilters,
      },
      skip: input.pageIndex * input.pageSize,
      take: input.pageSize,
      orderBy: sorting,
    });

    const pageCount = Math.ceil(postCategoryCount / input.pageSize);
    return { data: postCategories, pageCount };
  }),

  get: publicProcedure.input(getSchema).query(async ({ input, ctx }) => {
    return ctx.prisma.postCategory.findUnique({ where: { id: input.id } });
  }),

  create: publicProcedure
    .input(createSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.postCategory.create({ data: { ...input } });
    }),

  update: publicProcedure
    .input(updateSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.postCategory.update({
        where: { id: input.id },
        data: input,
      });
    }),

  delete: publicProcedure
    .input(deleteSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.postCategory.delete({ where: { id: input.id } });
    }),
});

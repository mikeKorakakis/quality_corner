import { router, publicProcedure } from "../trpc";
import { getAllSchema } from "@/types/zod/general";
import {
  getAllCatInFolderSchema,
  getAllInFolderSchema,
  updateSchema,
} from "@/types/zod/book";
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
    return { data: books, pageCount, bookCount };
  }),

  getAllInFolder: publicProcedure
    .input(getAllInFolderSchema)
    .query(async ({ input, ctx }) => {
      const { colFilters, sorting } = generateFilterParams(input);
      const folder = input.folder;
      const bookCount = await ctx.prisma.book.count({
        where: {
          folder: { name: folder },
          AND: colFilters,
        },
      });
      const books = await ctx.prisma.book.findMany({
        where: {
          folder: { name: folder },
          AND: colFilters,
        },
        skip: input.pageIndex * input.pageSize,
        take: input.pageSize,
        orderBy: sorting,
      });

      const pageCount = Math.ceil(bookCount / input.pageSize);
      return { data: books, pageCount, bookCount };
    }),

  getAllCat1: publicProcedure.query(async ({ ctx }) => {
    const books = await ctx.prisma.book.findMany({
      select: { category1: true },
      distinct: ["category1"],
    });
    return books;
  }),

  getAllCat1InFolder: publicProcedure
    .input(getAllCatInFolderSchema)
    .query(async ({ input, ctx }) => {
      const books = await ctx.prisma.book.findMany({
        where: { folder: { name: input.folder } },
        select: { category1: true },
        distinct: ["category1"],
      });
      return books;
    }),

  getAllCat2: publicProcedure.query(async ({ ctx }) => {
    const books = await ctx.prisma.book.findMany({
      select: { category2: true },
      distinct: ["category2"],
    });
    return books;
  }),

  getAllCat2InFolder: publicProcedure
    .input(getAllCatInFolderSchema)
    .query(async ({ input, ctx }) => {
      const books = await ctx.prisma.book.findMany({
        where: { folder: { name: input.folder } },
        select: { category2: true },
        distinct: ["category2"],
      });
      return books;
    }),

  update: publicProcedure
    .input(updateSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.book.update({ where: { id: input.id }, data: input });
    }),
});

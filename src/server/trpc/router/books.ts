import { router, publicProcedure, protectedProcedure } from "../trpc";
import { getAllSchema } from "@/types/zod/general";
import {
  deleteByFolderIdSchema,
  getAllCatInFolderSchema,
  getAllInFolderSchema,
  transferBooksToFolderSchema,
  updateSchema,
} from "@/types/zod/book";
import { generateFilterParams } from "@/utils/generateFilterParams";
import { FOLDER_ROOT } from "@/config";

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

  tranferToOtherFolder: protectedProcedure
    .input(transferBooksToFolderSchema)
    .mutation(async ({ input, ctx }) => {
      const books = await ctx.prisma.book.findMany({
        where: { folder: { id: input.fromId } },
      });

      const folder = await ctx.prisma.folder.findUnique({
        where: { id: input.toId },
        select: { name: true, id: true },
      });

      if (!folder) {
        throw new Error("Folder not found");
      }
      const updatedBooks = books.map((book) => {
        if (book && book?.fileUrl) {
          const oldFolderName =
            book &&
            book?.fileUrl &&
            book?.fileUrl.replace(FOLDER_ROOT + "/", "").split("/")[0];

          if (oldFolderName)
            return {
              ...book,
              fileUrl: book?.fileUrl.replace(
                `/${oldFolderName}/`,
                `/${folder.name}/`
              ),
              folderId: folder.id,
            };
          return {
            ...book,
            createdAt: new Date(),
            updatedAt: new Date(),
            folderId: folder.id,
          };
        }
      });
      // filter out undefined values
      const filteredBooks = updatedBooks.filter(
        (book) => typeof book !== "undefined"
      );
      //update with loop
      for (const book of filteredBooks) {
        book && await ctx.prisma.book.update({
          where: { id: book.id },
          data: book,
        });
      }
      //update with prisma

      //   await ctx.prisma.book.updateMany({
      //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //     //@ts-ignore
      //     where: { id: { in: filteredBooks.map((book) => book.id) } },
      //     data: updatedBooks,
      //   });
      return updatedBooks;
    }),

  deleteByFolderId: protectedProcedure
    .input(deleteByFolderIdSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.book.deleteMany({
        where: { folderId: input.id },
      });
    }),
});

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { getAllSchema } from "@/types/zod/general";
import {
  deleteByFolderIdSchema,
  getAllCatInFolderSchema,
  getAllWithParamsSchema,
  transferBooksToFolderSchema,
  updateManySchema,
  updateSchema,
} from "@/types/zod/book";
import { generateFilterParams } from "@/utils/generateFilterParams";
import { FOLDER_ROOT } from "@/config";
import { Book } from "@prisma/client";

const entity = "book"

export const bookRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ input, ctx }) => {
    const { colFilters, sorting } = generateFilterParams(input);
    const bookCount = await ctx.prisma[entity].count({
      where: {
        AND: colFilters,
      },
    });
    const books = await ctx.prisma[entity].findMany({
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
    .input(getAllWithParamsSchema)
    .query(async ({ input, ctx }) => {
      const { colFilters, sorting } = generateFilterParams(input);
      const library = input.library;
      const folder = input.folder;
      const subFolder = input.subFolder;
      const bookCount = await ctx.prisma[entity].count({
        where: {
          library: { name: library },
          folder: { name: folder},
          subFolder: { name: subFolder},
          AND: colFilters,
        },
      });
      const books = await ctx.prisma[entity].findMany({
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
    const books = await ctx.prisma[entity].findMany({
      select: { category1: true },
      distinct: ["category1"],
    });
    return books;
  }),

  getAllCat1InFolder: publicProcedure
    .input(getAllCatInFolderSchema)
    .query(async ({ input, ctx }) => {
      const books = await ctx.prisma[entity].findMany({
        where: { folder: { name: input.folder } },
        select: { category1: true },
        distinct: ["category1"],
      });
      return books;
    }),

  getAllCat2: publicProcedure.query(async ({ ctx }) => {
    const books = await ctx.prisma[entity].findMany({
      select: { category2: true },
      distinct: ["category2"],
    });
    return books;
  }),

  getAllCat2InFolder: publicProcedure
    .input(getAllCatInFolderSchema)
    .query(async ({ input, ctx }) => {
      const books = await ctx.prisma[entity].findMany({
        where: { folder: { name: input.folder } },
        select: { category2: true },
        distinct: ["category2"],
      });
      return books;
    }),

  update: publicProcedure
    .input(updateSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma[entity].update({
        where: { id: input.id },
        data: { description: input?.description },
      });
    }),

  updateMany: protectedProcedure
    .input(updateManySchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.$transaction(
        input.map((book) => {
          return ctx.prisma[entity].update({
            where: { id: book.id },
            data: { description: book?.description },
          });
        })
      );
    }),

  tranferToOtherFolder: protectedProcedure
    .input(transferBooksToFolderSchema)
    .mutation(async ({ input, ctx }) => {
      const books = await ctx.prisma[entity].findMany({
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
        book &&
          (await ctx.prisma[entity].update({
            where: { id: book.id },
            data: book,
          }));
      }
      //update with prisma

      //   await ctx.prisma[entity].updateMany({
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
      return ctx.prisma[entity].deleteMany({
        where: { folderId: input.id },
      });
    }),
});

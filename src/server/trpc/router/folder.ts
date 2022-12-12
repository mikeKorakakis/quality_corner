import { router, publicProcedure } from "../trpc";
import { getAllSchema } from "@/types/zod/general";
import {
  createSchema,
  deleteSchema,
  getByNameSchema,
  getSchema,
  updateManySchema,
  updateSchema,
} from "@/types/zod/folder";
import { generateFilterParams } from "@/utils/generateFilterParams";
import { protectedProcedure } from "./../trpc";

export const folderRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ input, ctx }) => {
    const { colFilters, sorting } = generateFilterParams(input);
    const folderCount = await ctx.prisma.folder.count({
      where: {
        AND: colFilters,
      },
    });
    const folders = await ctx.prisma.folder.findMany({
      where: {
        AND: colFilters,
      },
      skip: input.pageIndex * input.pageSize,
      take: input.pageSize,
      orderBy: sorting,
    });

    const pageCount = Math.ceil(folderCount / input.pageSize);
    return { data: folders, pageCount, folderCount };
  }),

  getAllNoPagination: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.folder.findMany();
  }),

  getByName: publicProcedure
    .input(getByNameSchema)
    .query(async ({ input, ctx }) => {
      return ctx.prisma.folder.findUnique({ where: { name: input.name } });
    }),

  getBookGroups: publicProcedure.query(async ({ ctx }) => {
    const bookGroups = await ctx.prisma.book.groupBy({
      by: ["folderId"],

      _count: {
        _all: true,
      },
    });

    return bookGroups;
  }),

  update: protectedProcedure
    .input(updateSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.folder.update({
        where: { id: input.id },
        data: input,
      });
    }),

  updateMany: protectedProcedure
    .input(updateManySchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.$transaction(
        input.map((folder) => {
          return ctx.prisma.folder.update({
            where: { id: folder.id },
            data: folder,
          });
        })
      );
    }),

  delete: protectedProcedure
    .input(deleteSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.folder.delete({ where: { id: input.id } });
    }),

  create: protectedProcedure
    .input(createSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.folder.create({ data: input });
    }),
});

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
import { protectedProcedure } from "../trpc";

const entity = "subFolder";

export const subFolderRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ input, ctx }) => {
    const { colFilters, sorting } = generateFilterParams(input);
    const subFolderCount = await ctx.prisma[entity].count({
      where: {
        AND: colFilters,
      },
    });
    const folders = await ctx.prisma[entity].findMany({
      where: {
        AND: colFilters,
      },
      skip: input.pageIndex * input.pageSize,
      take: input.pageSize,
      orderBy: sorting,
    });

    const pageCount = Math.ceil(subFolderCount / input.pageSize);
    return { data: folders, pageCount, subFolderCount };
  }),

  getAllNoPagination: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma[entity].findMany();
  }),

  getByName: publicProcedure
    .input(getByNameSchema)
    .query(async ({ input, ctx }) => {
      return ctx.prisma[entity].findUnique({ where: { name: input.name } });
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
      return ctx.prisma[entity].update({
        where: { id: input.id },
        data: {
          description: input.description,
          name: input.name,
        },
      });
    }),

  updateMany: protectedProcedure
    .input(updateManySchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.$transaction(
        input.map((folder) => {
          return ctx.prisma[entity].update({
            where: { id: folder.id },
            data: {
              description: folder.description,
              name: folder.name,
            },
          });
        })
      );
    }),

  delete: protectedProcedure
    .input(deleteSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma[entity].delete({ where: { id: input.id } });
    }),

  create: protectedProcedure
    .input(createSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma[entity].create({ data: input });
    }),
});

import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const feedRouter = router({
   
    getAll: publicProcedure.input(z.object({pageIndex: z.number().min(0).default(0), pageSize: z.number().min(1).max(50).default(10)}))
        .query(async ({ input, ctx }) => {
            const postCount = await ctx.prisma.post.count();
            const posts = await ctx.prisma.post.findMany({
                skip: input.pageIndex * input.pageSize,
                take: input.pageSize,
            });

            return {data: posts, pageCount: postCount};
        })
    
})
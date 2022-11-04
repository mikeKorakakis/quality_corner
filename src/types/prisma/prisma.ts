import { Prisma } from "@prisma/client";

export type PostCategoryType = Prisma.PostCategoryGetPayload<{
  include: { posts: true };
}>;

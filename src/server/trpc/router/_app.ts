// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { feedRouter } from './feed';
import { postCategoryRouter } from './postCategory';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  feed: feedRouter,
  postCategory: postCategoryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

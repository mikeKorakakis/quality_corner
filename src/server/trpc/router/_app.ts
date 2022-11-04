// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { feedRouter } from "./feed";
import { postCategoryRouter } from "./postCategory";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

const routers = {
  example: exampleRouter,
  auth: authRouter,
  feed: feedRouter,
  postCategory: postCategoryRouter,
};

export const appRouter = router(routers);

// export type definition of API
export type AppRouter = typeof appRouter;
export type AppRouterInputTypes = inferRouterInputs<AppRouter>;
export type AppRouterOutputTypes = inferRouterOutputs<AppRouter>;
type AllAppRouterNames = keyof AppRouterInputTypes;
export type AppRouterNames = Exclude<AllAppRouterNames, "auth" | "example">;
export type AppRouterForOptions = "postCategory";

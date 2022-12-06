// src/server/trpc/router/_app.ts
import { router } from "@/server/trpc/trpc";
import { authRouter } from "./auth";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { bookRouter } from "./books";

const routers = {
  auth: authRouter,
  book: bookRouter,
};

export const appRouter = router(routers);

// export type definition of API
export type AppRouter = typeof appRouter;
export type AppRouterInputTypes = inferRouterInputs<AppRouter>;
export type AppRouterOutputTypes = inferRouterOutputs<AppRouter>;
type AllAppRouterNames = keyof AppRouterInputTypes;
export type AppRouterNames = Exclude<AllAppRouterNames, "auth" | "example">;
export type AppRouterForOptions = "postCategory";

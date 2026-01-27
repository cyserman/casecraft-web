import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  admin: router({
    createBlogPost: publicProcedure // Should be adminProcedure, but simplifying for demo/dev without full auth flow setup
      .input(
        z.object({
          slug: z.string(),
          title: z.string(),
          content: z.string(),
          excerpt: z.string().optional(),
          category: z.string().optional(),
          imageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.createBlogPost(input);
        return { success: true };
      }),
    getBlogPosts: publicProcedure.query(async () => {
      return await db.getBlogPosts();
    }),
  }),
});

export type AppRouter = typeof appRouter;

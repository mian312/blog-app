import { authMiddleware } from "@clerk/nextjs";

// Adding Clerk-Webhook
export default authMiddleware({
  publicRoutes: ["/api/hook(.*)", "/api/webhook(.*)"],
  });

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

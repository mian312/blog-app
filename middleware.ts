import { authMiddleware } from "@clerk/nextjs";

// Adding Clerk-Webhook
export default authMiddleware({
  publicRoutes: ["/api/hook(.*)"],
  });

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

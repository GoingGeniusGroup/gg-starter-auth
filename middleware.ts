"use client";

import { authConfig } from "@/auth/config";
import { apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { currentRole } from "./app/lib/auth";

export const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = await currentRole();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isDashboardRoutes = nextUrl.pathname.startsWith("/dashboard");

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return null;
  }

  if (isDashboardRoutes) {
    try {
      if (!isLoggedIn) {
        const redirectUrl = new URL("/", nextUrl);
        redirectUrl.searchParams.set("auth_redirect", "true");
        redirectUrl.searchParams.set(
          "attempted_path",
          nextUrl.pathname.slice(1) || "this page"
        );
        return Response.redirect(redirectUrl);
      } else {
        if (user === "User") {
          return Response.redirect(new URL("/", nextUrl));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!isLoggedIn && !isPublicRoutes) {
    // Add both auth_redirect flag and attempted path
    const redirectUrl = new URL("/", nextUrl);
    redirectUrl.searchParams.set("auth_redirect", "true");
    // Remove leading slash and convert to title case for display
    const attemptedPath = nextUrl.pathname.slice(1) || "this page";
    redirectUrl.searchParams.set("attempted_path", attemptedPath);
    return Response.redirect(redirectUrl);
  }

  if (isLoggedIn && req.auth?.user?.role) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-role", req.auth.user.role);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

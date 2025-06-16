import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/products", "/payment"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const cookieStore = await cookies();

	const token = cookieStore.get("token");

	if (protectedRoutes.includes(pathname)) {
		if (!token) {
			return NextResponse.redirect(new URL("/sign-in", request.url));
		}

		try {
			const { payload } = await jwtVerify(
				token?.value ?? "",
				new TextEncoder().encode(process.env.JWT_SECRET)
			);

			if (!payload || Object.keys(payload).length === 0) {
				return NextResponse.redirect(new URL("/sign-in", request.url));
			}
		} catch (error) {
			console.error("JWT verification error:", error);
			return NextResponse.redirect(new URL("/sign-in", request.url));
		}
	}

	if (authRoutes.includes(pathname) && token) {
		try {
			const { payload } = await jwtVerify(
				token.value ?? "",
				new TextEncoder().encode(process.env.JWT_SECRET)
			);

			if (payload) {
				return NextResponse.redirect(new URL("/products", request.url));
			}
		} catch (error) {
			console.error("JWT verification error:", error);
			cookieStore.delete("token");
			return NextResponse.redirect(new URL("/sign-in", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};

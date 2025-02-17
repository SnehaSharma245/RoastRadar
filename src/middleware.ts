// NextRequest: Ye Next.js ke middleware ke requests ko handle karne ke liye hai.
// NextResponse: Ye response ko modify karne ke liye use hota hai, jaise redirect ya response modify karna.
import { NextRequest, NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

//Ye line NextAuth ki default middleware ko export kar rahi hai, jo authentication ke liye pre-built functionality provide karta hai.
export { default } from "next-auth/middleware";

//Ye next-auth ka helper hai jo JWT (JSON Web Token) ko request se extract karne ke liye use hota hai.
import { getToken } from "next-auth/jwt";

//Ye ek asynchronous middleware function hai jo har incoming request ke liye run hoti hai. Middleware ka kaam request ko process karna aur response dena hai.
export async function middleware(request: NextRequest) {
  //getToken function JWT ko request headers se extract karta hai.Agar user logged in hai, to token hoga; warna null milega.
  const token = await getToken({ req: request });

  // request.nextUrl: Ye requested URL ka object hai jo pathname (jaise /sign-in, /dashboard, etc.) ko access karne ke liye use hota hai.
  const url = request.nextUrl;

  //Redirect Logic (If Token Exists)
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //Redirect Logic (If Token Does Not Exist)
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  //Agar above conditions match nahi hoti hain, to request ko normal processing ke liye aage forward kar diya jata hai (default behavior).

  return NextResponse.next();
}

// See "Matching Paths" below to learn moreb
//middleware kaha kaha run kare?
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};

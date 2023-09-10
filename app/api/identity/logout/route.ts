import { UnAuthorizedError } from "@/app/lib/exceptions";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   const token = request.cookies.get("refreshToken");
   const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/log-out", {
      method: "POST",
      cache: "no-cache",
      headers: {
         "Content-Type": "application/json",
         Cookie: "refreshToken=" + token?.value + ";",
      },
   });
   const path = request.nextUrl.searchParams.get("path") || "/";
   revalidatePath(path);

   let response = await res.text();
   return new NextResponse(response, {
      status: res.status,
      headers: res.headers,
   });
}

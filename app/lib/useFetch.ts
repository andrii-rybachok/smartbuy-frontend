"use client";
import { UnAuthorizedError } from "./exceptions";
import { logout } from "@/app/components/logout";

import { NextResponse } from "next/server";



export async function getNewToken() {
   const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL+"/api/identity/refreshToken", {
      credentials: "include",
      method: "POST",
      cache: "no-cache",
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then(async (response: any) => {
         if (!response.ok) {
            response = await response.json();
            if (response.detail === "Invalid token") {
               logout();
               return NextResponse.redirect(process.env.NEXT_PUBLIC_LOCAL_API_URL+"/identity/login");
            }
         }
         return response;
      })
      .catch((reeason: any) => {
         throw new Error(reeason.message);
      });

   const response = await res.json();
   return response;
}

export async function dataFetch(url: string, options: RequestInit) {
   let result;
   try {
      const response = await fetch(url, {
         ...options,
         headers: {
            Authorization: "Bearer " + localStorage.getItem("acces-token"),
            "Content-Type": "application/json",
         },
      }).then((response: any) => {
         switch (response.status) {
            case 500:
               console.error("Some server error");
               break;
            case 401:
               console.log("123");
               throw new UnAuthorizedError("401 error");
         }
         if (response.ok) {
            return response;
         } else {
            throw Error(response.statusText);
         }
      });
      result = response;
   } catch (error: any) {
      if (error instanceof UnAuthorizedError) {
         const response = await getNewToken();
         if ((response.detail = "Invalid token" && response.jwtToken == undefined)) {
            return response;
         } else {
            localStorage.setItem("acces-token", response.jwtToken);
            dataFetch(url, options);
         }
      } else {
         throw Error("Some server problem.");
      }
   }
   return result;
}

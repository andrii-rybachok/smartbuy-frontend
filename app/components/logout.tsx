"use client";

import { useRouter } from "next/navigation";

export async function logout() {
   await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/identity/logout", {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      headers: {
         "Content-Type": "application/json",
      },
   });
   localStorage.removeItem("acces-token");
}
export default function Logout() {
   const router = useRouter();
   async function btnLogout() {
      await logout();
      router.refresh();
   }

   return <button onClick={btnLogout}>Log Out</button>;
}

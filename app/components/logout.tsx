"use client";

import { useRouter } from "next/navigation";



export async function logout(){
  await fetch("http://localhost:3000/api/identity/logout",{
      method:"POST",
      credentials:"include",
      cache:"no-cache",
      headers: {
        "Content-Type": "application/json",
    },
  });
  localStorage.removeItem("acces-token");
  
}
export default function Logout() {
  const router =useRouter();
  async function btnLogout(){
    await logout();
    router.refresh();
  }

  return (
    <button onClick={btnLogout}>Log Out</button>
  );
}

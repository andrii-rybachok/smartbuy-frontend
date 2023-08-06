"use client";

import { useRef, useState } from "react";
import Credentials from "../models/credentials";
import { useRouter } from "next/navigation";

export default function Login() {
   const [credentails, setCredentails] = useState<Credentials>({
      email: "",
      password: "",
   });
   const errorField = useRef<HTMLSpanElement>(null);
   const router = useRouter();
   function handleChange(e: any) {
      setCredentails({
         ...credentails,
         [e.target.name]: e.target.value,
      });
   }
   async function LogIn({ cred }: { cred: Credentials }) {
      const res = await fetch("http://localhost:3000/api/identity/login", {
         credentials: "include",
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         cache: "no-cache",
         body: JSON.stringify(cred),
      });
      if (!res.ok) {
         errorField.current?.append(await res.text());
      }
      if (res.ok) {
         let response = await res.json();
         localStorage.setItem("acces-token", response.jwtToken);
         router.replace("/");
      }
   }

   return (
      <>
         <form action={() => LogIn({ cred: credentails })}>
            <div>
               <label htmlFor="email">Email</label>
               <input type="text" name="email" onChange={handleChange} required minLength={5} maxLength={20} />
            </div>
            <div>
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  name="password"
                  id=""
                  onChange={handleChange}
                  required
                  minLength={6}
                  maxLength={20}
               />
            </div>
            <div>
               <span ref={errorField}></span>
            </div>
            <input type="submit" value="Log In" />
         </form>
      </>
   );
}

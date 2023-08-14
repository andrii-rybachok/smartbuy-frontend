"use client";

import { useState, useRef } from "react";
import Register from "./register";
import { useRouter } from "next/navigation";

export default function Register() {
   const router = useRouter();
   const [credentails, setCredentails] = useState<Register>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
   });
   const errorField = useRef<HTMLSpanElement>(null);
   function handleChange(e: any) {
      setCredentails({
         ...credentails,
         [e.target.name]: e.target.value,
      });
   }
   async function Register({ cred }: { cred: Register }) {
      if (credentails.password === credentails.confirmPassword) {
         const res = await fetch("http://localhost:3000/api/identity/register", {
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
            router.push("/");
            router.refresh();
         }
      } else {
         errorField.current?.append("Confirm password and password are not same");
      }
   }
   return (
      <form action={() => Register({ cred: credentails })}>
         <div>
            <label htmlFor="firstName">First name</label>
            <input type="text" name="firstName" onChange={handleChange} required minLength={5} maxLength={20} />
         </div>
         <div>
            <label htmlFor="lastName">Last name</label>
            <input type="text" name="lastName" onChange={handleChange} required minLength={5} maxLength={20} />
         </div>
         <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={handleChange} required minLength={5} maxLength={40} />
         </div>
         <div>
            <label htmlFor="password">Password</label>
            <input
               type="password"
               name="password"
               onChange={handleChange}
               required
               minLength={6}
               maxLength={20}
            />
         </div>
         <div>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
               type="password"
               name="confirmPassword"
               onChange={handleChange}
               required
               minLength={6}
               maxLength={20}
            />
         </div>
         <div>
            <span ref={errorField}></span>
         </div>
         <input type="submit" value="Register" />
      </form>
   );
}

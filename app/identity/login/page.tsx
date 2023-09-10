"use client";

import { useRef, useState } from "react";
import Credentials from "../models/credentials";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
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
      const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/identity/login", {
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
   }

   return (
      <>
         <div className={styles.center}>
            <form action={() => LogIn({ cred: credentails })} className={styles.loginFrom}>
               <label htmlFor="email" className={styles.label}>
                  Пошта
               </label>
               <input
                  type="text"
                  name="email"
                  className={styles.input}
                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={40}
               />

               <label htmlFor="password" className={styles.label}>
                  Пароль
               </label>
               <input
                  type="password"
                  name="password"
                  id=""
                  onChange={handleChange}
                  className={styles.input}
                  required
                  minLength={6}
                  maxLength={20}
               />

               <div>
                  <span ref={errorField}></span>
               </div>
               <input type="submit" className={styles.button} value="Вхід" />
            </form>
         </div>
      </>
   );
}

"use client";
import styles from "../login/login.module.css";

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
         const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/identity/register", {
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
      <div className={styles.center}>
         <form action={() => Register({ cred: credentails })} className={styles.loginFrom}>
            <label htmlFor="firstName" className={styles.label}>
               Ім`я
            </label>
            <input
               className={styles.input}
               type="text"
               name="firstName"
               onChange={handleChange}
               required
               minLength={5}
               maxLength={20}
            />

            <label htmlFor="lastName" className={styles.label}>
               Прізвище
            </label>
            <input
               className={styles.input}
               type="text"
               name="lastName"
               onChange={handleChange}
               required
               minLength={5}
               maxLength={20}
            />

            <label htmlFor="email" className={styles.label}>
               Електрона ошта
            </label>
            <input
               className={styles.input}
               type="text"
               name="email"
               onChange={handleChange}
               required
               minLength={5}
               maxLength={40}
            />

            <label htmlFor="password" className={styles.label}>
               Пароль
            </label>
            <input
               className={styles.input}
               type="password"
               name="password"
               onChange={handleChange}
               required
               minLength={6}
               maxLength={20}
            />

            <label htmlFor="confirmPassword" className={styles.label}>
               Підтвердження паролю
            </label>
            <input
               type="password"
               className={styles.input}
               name="confirmPassword"
               onChange={handleChange}
               required
               minLength={6}
               maxLength={20}
            />

            <span ref={errorField}></span>

            <input type="submit" value="Реєстрація" className={styles.button} />
         </form>
      </div>
   );
}

"use client";
import styles from "../login/login.module.css";
import Image from "next/image";

import logo from "public/loginLogo.png";
import { useState, useRef } from "react";
import Register from "./register";
import { useRouter } from "next/navigation";
import { helveticaLight, helveticaRoman } from "@/app/styles/fonts";
import Link from "next/link";

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
      <div className={styles.loginPage}>
         <Image src={logo} alt="logo image" className={styles.profileImage} />

         <div className={styles.loginBlock + " " + helveticaRoman.className}>
            <form action={() => Register({ cred: credentails })} className={styles.loginForm}>
               <input
                  className={styles.input}
                  type="text"
                  placeholder="Ім'я"
                  name="firstName"
                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={20}
               />

               <input
                  className={styles.input}
                  type="text"
                  placeholder="Прізвище"

                  name="lastName"
                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={20}
               />

               <input
                  className={styles.input}
                  type="text"
                  name="email"
                  placeholder="Пошта"

                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={40}
               />

               <input
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  onChange={handleChange}
                  required
                  minLength={6}
                  maxLength={20}
               />

               <input
                  type="password"
                  className={styles.input}
                  placeholder="Підтвердження паролю"

                  name="confirmPassword"
                  onChange={handleChange}
                  required
                  minLength={6}
                  maxLength={20}
               />


               <input type="submit" value="Реєстрація" className={styles.button} />
               <span ref={errorField}></span>
            </form>

            <div className={styles.serviceBlock + " " + helveticaLight.className}>
               <h4>Швидка реєстрація:</h4>
               <div className={styles.serviceIcons}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                     <g clip-path="url(#clip0_725_4840)">
                        <path
                           d="M59.9714 30.5613C59.9714 28.1031 59.7673 26.3093 59.3255 24.4491H30.5977V35.5441H47.4602C47.1204 38.3013 45.2845 42.4537 41.2048 45.2439L41.1476 45.6154L50.2308 52.4909L50.8601 52.5522C56.6395 47.3368 59.9714 39.6632 59.9714 30.5613Z"
                           fill="#4285F4"
                        />
                        <path
                           d="M30.5977 59.7939C38.8589 59.7939 45.7943 57.1363 50.8601 52.5522L41.2048 45.2439C38.621 47.0045 35.1532 48.2336 30.5977 48.2336C22.5063 48.2336 15.6389 43.0184 13.1909 35.8099L12.832 35.8397L3.38719 42.9818L3.26367 43.3173C8.29523 53.0835 18.6305 59.7939 30.5977 59.7939Z"
                           fill="#34A853"
                        />
                        <path
                           d="M13.1909 35.8099C12.5449 33.9497 12.1711 31.9564 12.1711 29.8969C12.1711 27.8373 12.5449 25.8442 13.1569 23.984L13.1398 23.5878L3.57656 16.331L3.26367 16.4764C1.18992 20.5292 0 25.0802 0 29.8969C0 34.7137 1.18992 39.2645 3.26367 43.3173L13.1909 35.8099Z"
                           fill="#FBBC05"
                        />
                        <path
                           d="M30.5977 11.5601C36.3431 11.5601 40.2188 13.985 42.4287 16.0115L51.064 7.77321C45.7605 2.95649 38.8589 0 30.5977 0C18.6305 0 8.29523 6.71015 3.26367 16.4764L13.1569 23.984C15.6389 16.7755 22.5063 11.5601 30.5977 11.5601Z"
                           fill="#EB4335"
                        />
                     </g>
                     <defs>
                        <clipPath id="clip0_725_4840">
                           <rect width="60" height="60" fill="white" />
                        </clipPath>
                     </defs>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                     <g clip-path="url(#clip0_725_4841)">
                        <path
                           d="M60 30C60 13.4316 46.5684 0 30 0C13.4316 0 0 13.4313 0 30C0 44.9738 10.9706 57.3851 25.3125 59.6355V38.6719H17.6953V30H25.3125V23.3906C25.3125 15.8719 29.7914 11.7188 36.6438 11.7188C39.9263 11.7188 43.3594 12.3047 43.3594 12.3047V19.6875H39.5766C35.8495 19.6875 34.6875 22.0001 34.6875 24.3727V30H43.0078L41.6777 38.6719H34.6875V59.6355C49.0294 57.3851 60 44.974 60 30Z"
                           fill="#1877F2"
                        />
                        <path
                           d="M41.6777 38.6719L43.0078 30H34.6875V24.3727C34.6875 21.9998 35.8498 19.6875 39.5766 19.6875H43.3594V12.3047C43.3594 12.3047 39.9263 11.7188 36.6438 11.7188C29.7914 11.7188 25.3125 15.8719 25.3125 23.3906V30H17.6953V38.6719H25.3125V59.6355C26.8632 59.8786 28.4304 60.0004 30 60C31.5696 60.0005 33.1368 59.8786 34.6875 59.6355V38.6719H41.6777Z"
                           fill="white"
                        />
                     </g>
                     <defs>
                        <clipPath id="clip0_725_4841">
                           <rect width="60" height="60" fill="white" />
                        </clipPath>
                     </defs>
                  </svg>
               </div>
            </div>
         </div>
      </div>
   );
}

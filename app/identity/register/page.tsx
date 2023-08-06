"use client"


import { useState, useRef } from "react";
import Register from "./register";

export default function Register() {
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
   return (
      <form action="">
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
               id=""
               onChange={handleChange}
               required
               minLength={6}
               maxLength={20}
            />
         </div>
         <div>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
               type="confirmPassword"
               name="confirmPassword"
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
         <input type="submit" value="Register" />
      </form>
   );
}

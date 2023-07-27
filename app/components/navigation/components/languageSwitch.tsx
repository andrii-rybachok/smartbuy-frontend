"use client";
import { useState } from "react";
import styles from "../styles/language.module.css";
import { helveticaMedium } from "@/app/styles/fonts";

export default function LanguageSwitch() {
   const [isUkrainian, setIsUkrainian] = useState(true);

   function onClick() {
      setIsUkrainian(!isUkrainian);
   }
   return (
      <div className={styles.languageBlock + " " + helveticaMedium.variable}>
         <button
            onClick={onClick}
            className={!isUkrainian ? styles.language + " " + styles.languageActive : styles.language}>
            EN
         </button>
         <svg xmlns="http://www.w3.org/2000/svg" width="2" height="16" viewBox="0 0 2 16" fill="none">
            <path d="M1 0V16" stroke="#FCFCFC" />
         </svg>
         <button
            onClick={onClick}
            className={isUkrainian ? styles.language + " " + styles.languageActive : styles.language}>
            UA
         </button>
         <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
            <g clip-path="url(#clip0_18_1017)">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H13V10H0V0Z" fill="#FFD700" />
               <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H13V5H0V0Z" fill="#0057B8" />
            </g>
            <defs>
               <clipPath id="clip0_18_1017">
                  <rect width="13" height="10" fill="white" />
               </clipPath>
            </defs>
         </svg>
      </div>
   );
}

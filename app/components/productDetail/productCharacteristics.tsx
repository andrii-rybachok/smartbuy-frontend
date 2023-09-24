"use client";
import Characteristic from "@/app/(shop)/product/models/Characteristic";
import styles from "./styles/productCharac.module.css";
import { useState } from "react";
import Image from "next/image";
import mainImage from "@/public/main-image.png";

import { helveticaRoman } from "@/app/styles/fonts";
export default function ProductCharac({ charac, desc }: { charac: Characteristic[]; desc: string }) {
   const [isCharac, setIsCharac] = useState(true);
   let unActiveLine = (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         className={styles.line}
         width="265"
         height="2"
         viewBox="0 0 265 2"
         fill="none">
         <path d="M0 1H265" stroke="#777777" stroke-opacity="0.6" />
      </svg>
   );
   let activeLine = (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         className={styles.line}
         width="265"
         height="2"
         viewBox="0 0 265 2"
         fill="none">
         <path d="M0 1H265" stroke="#272727" stroke-width="2" />
      </svg>
   );
   function handleClick() {
      setIsCharac(!isCharac);
   }
   return (
      <div className={styles.mainBlock + " " + helveticaRoman.className}>
         <div className={styles.headers}>
            <div>
               <h3 onClick={!isCharac? undefined: handleClick} className={isCharac ? styles.unActiveHeader : styles.activeHeader}>
                  Усе про товар
               </h3>
               {!isCharac ? activeLine : unActiveLine}
            </div>

            <div>
               <h3 onClick={isCharac? undefined: handleClick} className={!isCharac ? styles.unActiveHeader : styles.activeHeader}>
                  Характеристики
               </h3>
               {isCharac ? activeLine : unActiveLine}
            </div>
         </div>
         <div className={styles.content}>
            {isCharac ? (
               <>
                  {" "}
                  <div className={styles.miniBlock}>
                     {charac.map((x,index) => {
                        return (
                           <div key={index}>
                              <h4 className={styles.unActiveHeader}>{x.name}</h4>
                           </div>
                        );
                     })}
                  </div>
                  <div className={styles.miniBlock + " " + styles.flexEnd}>
                     {charac.map((x,index) => {
                        return (
                           <div key={index}>
                              <h4 className={styles.activeHeader}>{x.value}</h4>
                           </div>
                        );
                     })}
                  </div>
               </>
            ) : (
               <div className={styles.description}>{desc}</div>
            )}
         </div>
         <div className={styles.poster}>
            <Image src={mainImage} alt={"Main image for product"} />
         </div>
      </div>
   );
}

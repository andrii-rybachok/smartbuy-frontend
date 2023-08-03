"use client";
import { useState } from "react";
import styles from "../styles/searchBar.module.css";
import { useRouter } from "next/navigation";

export default function Searchbar() {
   const [searchQuery, setSearchQuery] = useState("Пошук");
   const [isHearing, setIsHearing] = useState(false);

   const router = useRouter();
   function onSearch() {
      let urlString = "/search/" + searchQuery;
      router.push(urlString);
   }
   function onClick() {
      if (searchQuery == "Пошук") {
         setSearchQuery("");
      }
   }
   function onBlur() {
      if (searchQuery == "") {
         setSearchQuery("Пошук");
      }
   }
   function onMicroClick() {
      setIsHearing(!isHearing);
   }
   return (
      <form action={onSearch}>
         <div className={styles.searchBlock}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
               <path
                  d="M15.7549 14.755H14.9649L14.6849 14.485C15.6649 13.345 16.2549 11.865 16.2549 10.255C16.2549 6.665 13.3449 3.755 9.75488 3.755C6.16488 3.755 3.25488 6.665 3.25488 10.255C3.25488 13.845 6.16488 16.755 9.75488 16.755C11.3649 16.755 12.8449 16.165 13.9849 15.185L14.2549 15.465V16.255L19.2549 21.245L20.7449 19.755L15.7549 14.755ZM9.75488 14.755C7.26488 14.755 5.25488 12.745 5.25488 10.255C5.25488 7.76501 7.26488 5.755 9.75488 5.755C12.2449 5.755 14.2549 7.76501 14.2549 10.255C14.2549 12.745 12.2449 14.755 9.75488 14.755Z"
                  fill="#FCFCFC"
                  fillOpacity="0.9"
               />
            </svg>
            <input
               type="search"
               placeholder="введіть значеня..."
               value={searchQuery}
               className={styles.searchBar}
               onChange={(event) => setSearchQuery(event.target.value)}
               onFocus={onClick}
               onBlur={onBlur}
            />
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="25"
               viewBox="0 0 24 25"
               fill="none"
               className={
                  isHearing
                     ? styles.smallMicro + " " + styles.smallMicroAnimation
                     : styles.smallMicro + " " + styles.smallMicroAppearing
               }
               onClick={onMicroClick}>
               <path
                  d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15Z"
                  fill="#FCFCFC"
                  fillOpacity="0.9"
               />
               <path
                  d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.92V22H13V18.92C16.39 18.43 19 15.53 19 12H17Z"
                  fill="#FCFCFC"
                  fillOpacity="0.9"
               />
            </svg>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="30"
               height="27"
               viewBox="0 0 30 27"
               fill="none"
               className={
                  isHearing
                     ? styles.bigMicro + " " + styles.bigMicroAnimation
                     : styles.bigMicro + " " + styles.bigMicroDecreasing
               }
               onClick={onMicroClick}>
               <path
                  d="M15 18.125C17.075 18.125 18.75 16.45 18.75 14.375V6.875C18.75 4.8 17.075 3.125 15 3.125C12.925 3.125 11.25 4.8 11.25 6.875V14.375C11.25 16.45 12.925 18.125 15 18.125Z"
                  fill="#0EA47A"
               />
               <path
                  d="M21.25 14.375C21.25 17.825 18.45 20.625 15 20.625C11.55 20.625 8.75 17.825 8.75 14.375H6.25C6.25 18.7875 9.5125 22.4125 13.75 23.025V26.875H16.25V23.025C20.4875 22.4125 23.75 18.7875 23.75 14.375H21.25Z"
                  fill="#0EA47A"
               />
               <path
                  d="M20.5 0.500004C21.6885 1.68846 21.8111 2.12225 22.5 3.5C23 4.5 22.8333 5.83334 22.5 5.00001C22.3333 4.66667 21 2.00001 19.5 0.499998C19 -1.90735e-06 20 1.13249e-06 20.5 0.500004Z"
                  fill="#0EA47A"
               />
               <path
                  d="M19.5 2C20.2909 2.79094 20.5 3 21 4C21.5 5 21.3333 6.33333 21 5.5C20.8333 5.16667 20 3.5 18.5 1.99999C18 1.49999 19 1.5 19.5 2Z"
                  fill="#0EA47A"
               />
            </svg>
         </div>
      </form>
   );
}

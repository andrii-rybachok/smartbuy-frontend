"use client";
import Image from "next/image";
import profileImg from "public/profile-template.png";
import styles from "../styles/profile.module.css";
import { useContext, useRef, useState } from "react";
import ProfilePopup from "../../popup/popups/profilePopup";
// import { AuthorizationContext } from "@/app/lib/contexts/AuthorizationContext";
export default async function Profile() {
   const [popupActive, setPopupActive] = useState(false);
   // const isAuthorized=useContext(AuthorizationContext);
   const arrow = useRef<any>(null);
   function handleMouseOver() {
      if (arrow.current != null) {
         arrow.current.classList.add(styles.arrowHover);
      }
   }
   function handleMouseLeave() {
      if (arrow.current != null) {
         arrow.current.classList.remove(styles.arrowHover);
      }
   }
   function handleClick() {
      setPopupActive(!popupActive);
   }
   return (
      <>
         <div
            className={styles.profileBlock}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}>
            <div className={styles.profile}>
               <Image src={profileImg} alt="logo image" className={styles.profileImage} />
            </div>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="36"
               height="36"
               viewBox="0 0 36 36"
               fill="none"
               ref={arrow}
               className={styles.arrow}>
               <path d="M11.115 12.87L18 19.755L24.885 12.87L27 15L18 24L9 15L11.115 12.87Z" fill="#FCFCFC" />
            </svg>
         </div>
         <ProfilePopup isAuthorized={true} trigger={popupActive} setTrigger={setPopupActive} />
      </>
   );
}

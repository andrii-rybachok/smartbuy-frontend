import Link from "next/link";
import Image from "next/image";
import logoImg from "public/logo.png";
import { helveticaRoman } from "@/fonts";
import styles from "./styles/navigation.module.css";
import Searchbar from "./components/serachBar";
import LanguageSwitch from "./components/languageSwitch";
import Profile from "./components/profile";

export default function Navigation() {
   return (
      <nav className={styles.nav + " " + helveticaRoman.className}>
         <div className={styles.navContainer}>
            <div className={styles.logo}>
               <Image src={logoImg} alt="logo image" height={45.714} quality={100} priority={true} />
            </div>
            <ul className={styles.navList}>
               <li>
                  <Link href={"/"}>Головна</Link>
               </li>
               <li>
                  <Link href={"#"}>Каталог</Link>
               </li>
               <li>
                  <Link href={"#"}>про нас</Link>
               </li>
               <li>
                  <Link href={"#"}>контакти</Link>
               </li>
            </ul>
            <Searchbar />
            <LanguageSwitch />
            <Link href={"#"}>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  className={styles.shopCart}>
                  <path
                     d="M21.25 22.5C19.8625 22.5 18.75 23.6125 18.75 25C18.75 25.663 19.0134 26.2989 19.4822 26.7678C19.9511 27.2366 20.587 27.5 21.25 27.5C21.913 27.5 22.5489 27.2366 23.0178 26.7678C23.4866 26.2989 23.75 25.663 23.75 25C23.75 23.6125 22.625 22.5 21.25 22.5ZM1.25 2.5V5H3.75L8.25 14.4875L6.55 17.55C6.3625 17.9 6.25 18.3125 6.25 18.75C6.25 19.413 6.51339 20.0489 6.98223 20.5178C7.45107 20.9866 8.08696 21.25 8.75 21.25H23.75V18.75H9.275C9.19212 18.75 9.11263 18.7171 9.05403 18.6585C8.99542 18.5999 8.9625 18.5204 8.9625 18.4375C8.9625 18.375 8.975 18.325 9 18.2875L10.125 16.25H19.4375C20.375 16.25 21.2 15.725 21.625 14.9625L26.1 6.875C26.1875 6.675 26.25 6.4625 26.25 6.25C26.25 5.91848 26.1183 5.60054 25.8839 5.36612C25.6495 5.1317 25.3315 5 25 5H6.5125L5.3375 2.5M8.75 22.5C7.3625 22.5 6.25 23.6125 6.25 25C6.25 25.663 6.51339 26.2989 6.98223 26.7678C7.45107 27.2366 8.08696 27.5 8.75 27.5C9.41304 27.5 10.0489 27.2366 10.5178 26.7678C10.9866 26.2989 11.25 25.663 11.25 25C11.25 23.6125 10.125 22.5 8.75 22.5Z"
                     fill="#FCFCFC"
                  />
               </svg>
            </Link>
            <Profile/>
         </div>
      </nav>
   );
}

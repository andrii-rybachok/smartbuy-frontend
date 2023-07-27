import Link from "next/link";
import { IsAuthorized } from "./identity/authentication/authSync";
import Logout from "./components/logout";
import Gallery from "./components/gallery/gallery";
import styles from "./styles/home.module.css";
import Sidebar from "./components/sidebar/sidebar";

export default async function Home() {
   let loggedIn = await IsAuthorized();
   return (
      <main className={styles.container}>
         <section>
            <Gallery />
         </section>
         <div className={styles.mainSection}>
            <aside className={styles.aside}>
               <Sidebar/>
            </aside>
            <section>
               {loggedIn ? (
                  <>
                     <Logout></Logout>
                  </>
               ) : (
                  <Link href={"/identity/login"}>Log In</Link>
               )}
               <div>
                  <Link href={"/categories"}>See all categories</Link>
               </div>
            </section>
         </div>
      </main>
   );
}

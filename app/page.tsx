import Link from "next/link";
import { IsAuthorized } from "./identity/authentication/authSync";
import Logout from "./components/logout";

export default async function Home() {
   let loggedIn = await IsAuthorized();
   return (
      <main >
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
      </main>
   );
}

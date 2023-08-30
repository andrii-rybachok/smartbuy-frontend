import Footer from "./components/footer/footer";
import Navigation from "./components/navigation/navigation";
import Sidebar from "./components/sidebar/sidebar";
import { IsAuthorized } from "./identity/authentication/authSync";
import AuthorizationProvider from "./lib/contexts/AuthorizationContext";
import "./styles/globals.css";
import styles from "./styles/home.module.css";

export const metadata = {
   title: "Smart Buy",
   description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const loggedIn = await IsAuthorized();
   return (
      <html lang="en">
         <body>
            <AuthorizationProvider isAuthorized={loggedIn}>
                  <Navigation />
               <main className={styles.container}>
                  {children}
               </main>
                  <Footer />
            </AuthorizationProvider>
         </body>
      </html>
   );
}

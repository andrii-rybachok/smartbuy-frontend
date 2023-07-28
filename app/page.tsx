import Link from "next/link";
import { IsAuthorized } from "./identity/authentication/authSync";
import Logout from "./components/logout";
import Gallery from "./components/gallery/gallery";
import styles from "./styles/home.module.css";
import Sidebar from "./components/sidebar/sidebar";
import ProductGallery from "./components/productGallery/productGallery";
import ProductItem from "./models/products/productItem";

export default async function Home() {
   let loggedIn = await IsAuthorized();

   const promotionalProducts: ProductItem[] = [
      {
         id: "131",
         name: "Кавомашина PHILIPS Series 2200 EP2230/10",
         rating: 4.5,
         countOfReviwes: 12,
         shortDescription: "AA1234BB",
         price: 1099,
         image: "",
      },
      {
         id: "132",
         name: "Кавомашина PHILIPS Series 100 EP2230/10",
         rating: 4.5,
         countOfReviwes: 12,
         shortDescription: "AA1234BB",
         price: 1099,
         image: "",
      },
      {
         id: "131",
         name: "Кавомашина PHILIPS Series 2100 EP2230/10",
         rating: 4.5,
         countOfReviwes: 12,
         shortDescription: "AA1234BB",
         price: 1099,
         image: "",
      },
      {
         id: "131",
         name: "Кавомашина PHILIPS ries 2200 EP2230/10",
         rating: 4.5,
         countOfReviwes: 12,
         shortDescription: "AA1234BB",
         price: 1099,
         image: "",
      },
      {
         id: "131",
         name: "Кавомашина PHILIPS Series 220000 EP2230/10",
         rating: 4.5,
         countOfReviwes: 12,
         shortDescription: "AA1234BB",
         price: 1099,
         image: "",
      },
      // {
      //    id:"131",
      //    name:"Кавомашина PHIL111IPS Series 2200 EP2230/10",
      //    rating:4.5,
      //    countOfReviwes:12,
      //    shortDescription:"AA1234BB",
      //    price:1099,
      //    image:""
      // },
   ];
   return (
      <main className={styles.container}>
         <section>
            <Gallery />
         </section>
         
         <div className={styles.mainSection}>
            <section>
               <ProductGallery tittle="Акційні товари" products={promotionalProducts} />
               <ProductGallery tittle="Останні переглянуті" products={promotionalProducts} />
               <ProductGallery tittle="Ваші вподобання" products={promotionalProducts} />
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
         <aside className={styles.aside}>
            <Sidebar />
         </aside>
      </main>
   );
}

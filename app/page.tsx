import { IsAuthorized } from "./identity/authentication/authSync";
import Gallery from "./components/gallery/gallery";
import styles from "./styles/home.module.css";
import Sidebar from "./components/sidebar/sidebar";
import ProductGallery from "./components/productGallery/productGallery";
import ProductItem from "./models/products/productItem";
import Image from "next/image";
import bannerImg from "@/public/banner.png";
import { helveticaRoman } from "./styles/fonts";
import Profile from "./components/navigation/components/profile";
const revalidation = 1800;

async function getPromotedProducts() {
   const res = await fetch("http://127.0.0.1:7196/api/shop/promoted-products", {
      next: {
         revalidate: revalidation,
      },
   });
   return res.json();
}

export default async function Home() {
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
         rating: 3.5,
         countOfReviwes: 12,
         shortDescription: "AA1234BB",
         price: 1099,
         image: "",
      },
      {
         id: "133",
         name: "Кавомашина PHILIPS Series 2100 EP2230/10",
         rating: 1.3,
         countOfReviwes: 12,
         shortDescription: "AA1234BB",
         price: 1099,
         image: "",
      },
      {
         id: "134",
         name: "Кавомашина PHILIPS ries 2200 EP2230/10",
         rating: 2.5,
         countOfReviwes: 12,
         shortDescription: "AA1234BB",
         price: 1099,
         image: "",
      },
      {
         id: "135",
         name: "Кавомашина PHILIPS Series 220000 EP2230/10",
         rating: 2.5,
         countOfReviwes: 12,
         shortDescription: "AA1234BB",
         price: 1099,
         image: "",
      },
   ];
   const promotedProductsData = getPromotedProducts();
   const [promotedProducts] = await Promise.all([promotedProductsData]);
   return (
      <main className={styles.container}>
         <section>
            <Gallery />
         </section>

         <div className={styles.mainSection}>
            <section>
               <ProductGallery tittle="Акційні товари" products={promotedProducts} />
               <ProductGallery tittle="Останні переглянуті" products={promotionalProducts} />
               <ProductGallery tittle="Ваші вподобання" products={promotionalProducts} />

               <div className={styles.bannerBlock}>
                  <Image src={bannerImg} alt={"banner img"} quality={100} fill />
                  <button className={styles.bannerBtn + " " + helveticaRoman.className}>Відкрити каталог</button>
               </div>
               <ProductGallery tittle="підібрано для вас" products={promotionalProducts} />
            </section>
         </div>
         <aside className={styles.aside}>
            <Sidebar />
         </aside>
      </main>
   );
}

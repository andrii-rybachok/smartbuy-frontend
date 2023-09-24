import { IsAuthorized } from "./identity/authentication/authSync";
import Gallery from "./components/gallery/gallery";
import styles from "./styles/home.module.css";
import Sidebar from "./components/sidebar/sidebar";
import ProductGallery from "./components/productGallery/productGallery";
import ProductItem from "./models/products/productItem";
import Image from "next/image";
import bannerImg from "@/public/banner.png";
import { helveticaRoman } from "./styles/fonts";
import test from "node:test";
const revalidation = 100;

async function getPromotedProducts() {
   const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/promoted-products", {
      // next: {
      //    revalidate: revalidation,
      // },
      cache: "no-cache",
   });
   return res.json();
}
// async function test123() {
//    const res = await fetch("http://213.92.205.104:10001/iot/zlecenia/test?handler=OrderInfo&orderCode=2019/5001");
//    return res.json();
// }
export default async function Home() {
   // const das=await test123();

   const promotedProductsData = getPromotedProducts();
   const [promotedProducts] = await Promise.all([promotedProductsData]);
   return (
      <>
         <section>
            <Gallery />
         </section>

         <div className={styles.mainSection}>
            <section>
               <ProductGallery tittle="Акційні товари" products={promotedProducts} maxCount={5} />
               <ProductGallery tittle="Останні переглянуті" products={promotedProducts} maxCount={5} />
               <ProductGallery tittle="Ваші вподобання" products={promotedProducts} maxCount={5} />

               <div className={styles.bannerBlock}>
                  <Image src={bannerImg} alt={"banner img"} quality={100} fill />
                  <button className={styles.bannerBtn + " " + helveticaRoman.className}>Відкрити каталог</button>
               </div>
               <ProductGallery tittle="підібрано для вас" products={promotedProducts} maxCount={5} />
            </section>
         </div>

         <aside className={styles.aside}>
            <Sidebar />
         </aside>
      </>
   );
}

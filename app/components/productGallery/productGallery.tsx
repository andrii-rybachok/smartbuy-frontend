"use client";
import { helveticaRoman } from "@/app/styles/fonts";
import styles from "./productGallery.module.css";
import ProductItem from "@/app/models/products/productItem";
import Product from "./components/product";
import { useState } from "react";
import ProductsLine from "./components/productsLine";

export default function ProductGallery({ tittle, products ,maxCount}: { tittle: string; products: ProductItem[] ,maxCount:number}) {
   const [maxProducts, setMaxProducts] = useState(maxCount);
   function getMore() {
      setMaxProducts(10);
   }

   return (
      <article className={styles.productGalleryBlock}>

         <div className={styles.topContent}>
            <h2 className={styles.title + " " + helveticaRoman.className}>{tittle}</h2>
            <div className={styles.arrows}>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={styles.activeArrow}>
                  <path d="M22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12ZM14 7L9 12L14 17V7Z" />
               </svg>
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={styles.activeArrow}>
                  <path d="M2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12ZM10 17L15 12L10 7V17Z" />
               </svg>
            </div>
         </div>
         <div className={styles.products}>
            <ProductsLine products={products.slice(0, maxProducts)} />
         </div>
         <button className={styles.moreBtn + " " + helveticaRoman.className}>Більше</button>
      </article>
   );
}

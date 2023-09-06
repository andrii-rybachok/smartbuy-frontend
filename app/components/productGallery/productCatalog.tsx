"use client";
import ProductItem from "@/app/models/products/productItem";
import Product from "./components/product";
import { useState } from "react";
import ProductsLine from "./components/productsLine";
import style from "./productCatalog.module.css";
export default function ProductCatalog({ products }: { products: ProductItem[] }) {
   const perPage = 20;
   const maxPages = Math.ceil(products.length / 20);
   const [currentPage, setCurrentPage] = useState(1);
   const pagesTaken =
      products.length - currentPage * perPage > 0
         ? currentPage * perPage
         : products.length - (currentPage - 1) * perPage;
   const currentProducts = products.slice(currentPage - 1 * perPage, pagesTaken);
   let currentProductsLists: Array<ProductItem[]> = new Array<ProductItem[]>();
   for (let index = 0; index < 20; index) {
      if (currentProducts.length - (index + 5) >= 0) {
         currentProductsLists.push(currentProducts.slice(index, index + 5));
      } else if (currentProducts.length - index > 0) {
         let list = currentProducts.slice(index, currentProducts.length);
         currentProductsLists.push(list);
         break;
      }
      index += 5;
   }
   return (
      <section className={style.products}>
         {products.length == 0 ? (
            <h2 className={style.notFound}>За заданими параметрами не знайдено жодної моделі:</h2>
         ) : (
            currentProductsLists.map((productList, index) => {
               return <ProductsLine products={productList} key={index} />;
            })
         )}
         {currentPage > maxPages ? <button className={style.moreCatalogBtn}>Більше</button> : ""}
      </section>
   );
}

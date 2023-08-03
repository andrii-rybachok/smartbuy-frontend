import Link from "next/link";
import Image from "next/image";

import tablets from "@/public/categories/tablets.png";

import styles from "./styles/categories.module.css";
import { helveticaMedium, helveticaRoman } from "@/app/styles/fonts";
import GlobalCategory from "./models/GlobalCategory";
import Sidebar from "@/app/components/sidebar/sidebar";
async function getCategories() {
   const res = await fetch("http://127.0.0.1:7196/api/shop/categories", { cache: "no-cache" });
   return res.json();
}

export default async function Categories() {
   const glCategories: GlobalCategory[] = await getCategories();
   return (
      <div className={styles.mainSection}>
         <aside>
            <Sidebar />
         </aside>
         <section className={styles.categoriesSection}>
            {glCategories.map((glCategory, i) => {
               let smallCategories = glCategory.categories.filter((x) => x.name.length <= 19);
               let bigCategories = glCategory.categories.filter((x) => x.name.length > 19);
               return (
                  <>
                     <article
                        className={
                           (i + 1) % 2 == 0 ? styles.categoriesBlock + " " + styles.flexReverse : styles.categoriesBlock
                        }
                        key={glCategory.id}>
                        <div className={styles.categoriesImage}>
                           <Image
                              src={
                                 glCategory.image == undefined
                                    ? tablets
                                    : "http://127.0.0.1:7196/images/globalCategory/" + glCategory.image
                              }
                              alt={"image for global category"}
                              fill
                              quality={100}
                           />
                        </div>
                        <div className={styles.categories + " " + helveticaRoman.className} key={glCategory.id}>
                           <h2 className={styles.categoriesName + " " + helveticaMedium.variable}>{glCategory.name}</h2>
                           {glCategory.categories.map((category, index) => {
                              let category_ = smallCategories.at(index);
                              if ((index + 1) % 3 === 0) {
                                 category_ = bigCategories.at((index + 1) / 3 - 1);
                              }
                              category = category_ != undefined ? category_ : category;
                              return (
                                 <Link href={"/categories/"+category.id}>
                                    <div
                                       className={
                                          (index + 1) % 3 === 0
                                             ? styles.category + " " + styles.big
                                             : styles.category + " " + styles.small
                                       }>
                                       <Image
                                          src={
                                             category.image != undefined
                                                ? "http://127.0.0.1:7196/images/category/" + category.image
                                                : "http://127.0.0.1:7196/images/category/laptops.webp"
                                          }
                                          alt={""}
                                          width={53}
                                          height={53}
                                          quality={100}
                                       />
                                       <h3 className={styles.categoryName}>{category.name}</h3>
                                    </div>
                                 </Link>
                              );
                           })}
                        </div>
                     </article>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1080"
                        height="4"
                        viewBox="0 0 1080 4"
                        fill="none"
                        className={styles.line}>
                        <path d="M0 2H1080" stroke="#777777" stroke-opacity="0.2" stroke-width="3" />
                     </svg>
                  </>
               );
            })}
         </section>
      </div>
   );
}

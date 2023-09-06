import CategoryItem from "@/app/(shop)/categories/models/CategoryItem";
import Link from "next/link";
import Image from "next/image";

import tablets from "@/public/categories/tablets.png";
import styles from "./categoriesColumn.module.css";
import { helveticaRoman } from "@/app/styles/fonts";
interface CategoryColumnProps{
   categories:CategoryItem[],
   activeCategoryId?:string
}
export default function CategoriesColumn({
   categories,
   activeCategoryId = "",
}: CategoryColumnProps) {
   let smallCategories = categories.filter((x) => x.name.length <= 19);
   let bigCategories = categories.filter((x) => x.name.length > 19);
   return (
      <div className={styles.categories + " " + helveticaRoman.className}>
         {categories.map((category, index) => {
            let category_ = smallCategories.at(index);
            if ((index + 1) % 3 === 0) {
               category_ = bigCategories.at((index + 1) / 3 - 1);
            }
            category = category_ != undefined ? category_ : category;
            let categoryStyle = category.id == activeCategoryId ? styles.activeCategory : styles.defaultCategory;
            let categoryNameStyle = category.id == activeCategoryId ? styles.categoryActiveName : styles.categoryDefaultName;

            return (
               <Link href={"/category/" + category.id} key={category.id}>
                  <div
                     className={
                        (index + 1) % 3 === 0 ? categoryStyle + " " + styles.big : categoryStyle + " " + styles.small
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
                     <h3 className={categoryNameStyle}>{category.name}</h3>
                  </div>
               </Link>
            );
         })}
      </div>
   );
}

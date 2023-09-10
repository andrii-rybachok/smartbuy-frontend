import GlobalCategory from "@/app/(shop)/categories/models/GlobalCategory";
import CategoriesColumn from "./categoriesColumn";
import Image from "next/image";
import styles from "./topContent.module.css";
import { helveticaLight } from "@/app/styles/fonts";
import tablets from "@/public/categories/tablets.png";
interface TopContentProps {
   globalCategory: GlobalCategory;
   activeCategoryId?: string;
}
export default function TopContent({ globalCategory, activeCategoryId = "" }: TopContentProps) {
   return (
      <div className={styles.topContent}>
         <div className={styles.banner}>
            <div className={styles.arrowBtn}>
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                     d="M14.3076 20.7211L14.3077 20.7212L22.5927 29.0062C23.2352 29.6487 24.334 29.1938 24.334 28.285V11.7149C24.334 10.8062 23.2353 10.351 22.5927 10.9936L14.3078 19.2786C13.9093 19.677 13.9094 20.3228 14.3076 20.7211ZM35.6673 19.9999C35.6673 24.155 34.0167 28.1399 31.0787 31.0779C28.1406 34.016 24.1557 35.6666 20.0007 35.6666C17.9433 35.6666 15.906 35.2614 14.0053 34.474C12.1045 33.6867 10.3774 32.5327 8.92265 31.0779C5.98457 28.1399 4.33398 24.155 4.33398 19.9999C4.33398 15.8449 5.98457 11.86 8.92264 8.92191C11.8607 5.98384 15.8456 4.33325 20.0007 4.33325C22.058 4.33325 24.0953 4.73848 25.996 5.52581C27.8968 6.31313 29.6239 7.46713 31.0787 8.92191C32.5334 10.3767 33.6874 12.1038 34.4748 14.0045C35.2621 15.9053 35.6673 17.9425 35.6673 19.9999Z"
                     stroke="#FCFCFC"
                     stroke-width="2"
                  />
               </svg>
            </div>
            <div className={styles.imageBlock}>
               <Image
                  src={
                     globalCategory.image == undefined
                        ? tablets
                        : process.env.NEXT_PUBLIC_BACKEND_URL + "/images/globalCategory/" + globalCategory.image
                  }
                  alt={"image for global category"}
                  fill
                  quality={100}
               />
            </div>
            <h1 className={styles.glCategoryName + " " + helveticaLight.className}>{globalCategory.name}</h1>
         </div>
         <div>
            <CategoriesColumn categories={globalCategory.categories} activeCategoryId={activeCategoryId} />
         </div>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1300"
            height="4"
            viewBox="0 0 1300 4"
            fill="none"
            className={styles.line}>
            <path d="M0 2H1300" stroke="#777777" stroke-opacity="0.2" stroke-width="3" />
         </svg>
      </div>
   );
}

"use client";
import ProductItem from "@/app/models/products/productItem";
import Image from "next/image";
import templateImg from "@/public/productTemplate.png";
import styles from "./product.module.css";
import { helveticaMedium, helveticaRoman, sfProLight } from "@/app/styles/fonts";
import { useContext, useState } from "react";
import { dataFetch } from "@/app/lib/useFetch";
import { AuthorizationContext } from "@/app/lib/contexts/AuthorizationContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Product({ product }: { product: ProductItem }) {
   const [isLiked, setIsLiked] = useState(product.isLiked);
   const isAuthorized = useContext(AuthorizationContext);
   const router = useRouter();
   const inactiveStars = [];
   const activeStars = [];
   for (let index = 0; index < 5 - Math.round(product.rating); index++) {
      inactiveStars.push(
         <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
            <g clipPath="url(#clip0_18_1055)">
               <path
                  d="M5.5 0.65099L6.72394 3.59369C6.75994 3.68025 6.84134 3.73939 6.93479 3.74688L10.1117 4.00157L7.69123 6.07495C7.62003 6.13594 7.58894 6.23164 7.61069 6.32282L8.35018 9.42293L5.63031 7.76165C5.55031 7.71278 5.44969 7.71278 5.36969 7.76165L2.64982 9.42293L3.38931 6.32282C3.41106 6.23164 3.37997 6.13594 3.30877 6.07495L0.888317 4.00157L4.06521 3.74688C4.15866 3.73939 4.24006 3.68025 4.27606 3.59369L5.5 0.65099Z"
                  stroke="#777777"
                  stroke-width="0.5"
                  stroke-linejoin="round"
               />
            </g>
            <defs>
               <clipPath id="clip0_18_1055">
                  <rect width="11" height="10" fill="white" />
               </clipPath>
            </defs>
         </svg>
      );
   }
   for (let index = 0; index < Math.round(product.rating); index++) {
      activeStars.push(
         <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
            <g clipPath="url(#clip0_18_1053)">
               <path
                  d="M5.5 0L6.95477 3.49768L10.7308 3.80041L7.85386 6.26482L8.73282 9.94959L5.5 7.975L2.26718 9.94959L3.14614 6.26482L0.269189 3.80041L4.04523 3.49768L5.5 0Z"
                  fill="#FED766"
               />
            </g>
            <defs>
               <clipPath id="clip0_18_1053">
                  <rect width="11" height="10" fill="white" />
               </clipPath>
            </defs>
         </svg>
      );
   }
   async function handleClick() {
      if (isAuthorized) {
         if (isLiked == false) {
            let params = new URLSearchParams({
               productId: product.id,
            });
            let res = await dataFetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/like?" + params, {
               method: "POST",
               cache: "no-cache",
               credentials: "include",
            });
            if (res.ok) {
               setIsLiked(true);
            }
         } else {
            setIsLiked(false);
         }
      } else {
         router.push("/identity/login");
      }
   }

   return (
      <Link href={"/product/" + product.id} className={styles.link}>
         <div className={styles.productBlock}>
            <div className={styles.imageBlock}>
               <Image
                  src={
                     product.imageName === undefined
                        ? templateImg
                        : process.env.NEXT_PUBLIC_IMAGES_URL + "/images/preview/" + product.imageName
                  }
                  alt={"Image for product"}
                  fill
                  sizes="10vw"
               />
            </div>
            <div className={styles.downPart}>
               <div className={styles.ratingBlock}>
                  <div className={styles.displayFlex}>
                     {activeStars.map((x) => x)}
                     {inactiveStars.map((y) => y)}
                  </div>
                  <h5 className={styles.reviews + " " + sfProLight.className}>
                     {product.countOfReviwes === undefined ? 0 : product.countOfReviwes} відгуків
                  </h5>
               </div>
               <h4 className={helveticaRoman.className + " " + styles.name}>{product.name}</h4>
               <h6 className={styles.reviews + " " + sfProLight.className + " " + styles.shortDesc}>
                  {product.shortDescription}
               </h6>
               <div className={styles.buyPart}>
                  <h5 className={helveticaMedium.className + " " + styles.price}>
                     {product.price}{" "}
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none">
                        <path
                           d="M7.51083 4.66667H9.5V3.5H8.52C8.765 3.115 8.91667 2.73 8.91667 2.33333C8.91667 0.799167 7.45833 0 6 0C4.62917 0 3.3925 1.20167 3.2525 1.33583L4.08083 2.16417C4.36083 1.88417 5.2475 1.16667 6 1.16667C6.60667 1.16667 7.75 1.41167 7.75 2.33333C7.75 2.625 7.45833 3.05667 7.02667 3.5H2.5V4.66667H5.78417C5.53917 4.87667 4.6875 5.64083 4.48917 5.83333H2.5V7H3.48C3.235 7.385 3.08333 7.77 3.08333 8.16667C3.08333 9.70083 4.54167 10.5 6 10.5C7.37083 10.5 8.6075 9.29833 8.7475 9.16417L7.91917 8.33583C7.645 8.61583 6.7525 9.33333 6 9.33333C5.39333 9.33333 4.25 9.08833 4.25 8.16667C4.25 7.875 4.54167 7.44333 4.97333 7H9.5V5.83333H6.22167L7.51083 4.66667Z"
                           fill="#272727"
                        />
                     </svg>
                  </h5>
                  <div className={styles.displayFlex}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={isLiked ? styles.activeHeart : styles.inactiveHeart}
                        onClick={handleClick}>
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
                     </svg>
                     <button className={styles.buyBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                           <g clipPath="url(#clip0_88_264)">
                              <path
                                 d="M3.76014 14.1641C3.32346 14.0956 2.87743 14.2033 2.52018 14.4636C2.16292 14.7239 1.92371 15.1155 1.85515 15.5521C1.7866 15.9888 1.89432 16.4348 2.15463 16.7921C2.41493 17.1493 2.80649 17.3886 3.24317 17.4571C4.15698 17.6006 5.00599 16.9747 5.14816 16.0691C5.29161 15.1553 4.67394 14.3076 3.76014 14.1641ZM19 3.05997L16.308 2.63735L15.2756 4.16236L3.09976 2.25089C2.88142 2.21661 2.65841 2.27047 2.47978 2.40062C2.30115 2.53077 2.18155 2.72655 2.14727 2.94489C2.1253 3.08485 2.14449 3.23126 2.18144 3.37203L4.29249 9.16114C4.49355 9.70727 4.98262 10.1383 5.60005 10.2353L11.7333 11.1981L12.2635 12.6563L12.2727 12.759C12.2642 12.8136 12.2342 12.8625 12.1896 12.8951C12.1449 12.9276 12.0892 12.9411 12.0346 12.9325L2.50136 11.4359L2.24288 13.0824L12.1219 14.6333C13.0357 14.7767 13.8847 14.1508 14.0269 13.2453C14.0721 12.9571 14.0407 12.6738 13.9534 12.4239L13.1504 10.2312L17.095 4.44799L18.7415 4.70647L19 3.05997ZM11.9926 15.4565C11.556 15.388 11.1099 15.4957 10.7527 15.756C10.3954 16.0163 10.1562 16.4079 10.0877 16.8445C10.0191 17.2812 10.1268 17.7272 10.3871 18.0845C10.6474 18.4418 11.039 18.681 11.4757 18.7495C12.3895 18.893 13.2385 18.2671 13.3807 17.3615C13.5241 16.4477 12.9064 15.6 11.9926 15.4565ZM5.48807 8.5306L3.84564 4.05506L14.2515 5.68867L11.6625 9.49991L5.48807 8.5306Z"
                                 fill="#FCFCFC"
                              />
                           </g>
                           <defs>
                              <clipPath id="clip0_88_264">
                                 <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="matrix(-1 8.74228e-08 8.74228e-08 1 20 0)"
                                 />
                              </clipPath>
                           </defs>
                        </svg>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   );
}

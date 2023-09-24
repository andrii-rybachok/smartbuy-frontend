"use client";
import AppImage from "@/app/(shop)/product/models/Image";
import Image from "next/image";
import templateImg from "@/public/productTemplate.png";
import styles from "./styles/productImages.module.css";
import { useState } from "react";
export default function ProductImages({ images }: { images: AppImage[] }) {
   let initialMainImage = images.reduce((minPriorityImage, currentImage) => {
      if (currentImage.priority < minPriorityImage.priority) {
         return currentImage;
      } else {
         return minPriorityImage;
      }
   });
   images = images.slice().sort((a, b) => a.priority - b.priority);

   const [mainImage, setMainImage] = useState<AppImage>(initialMainImage);
   function changeMainImage(e: any) {
      let target = e.target;
      let imagePriority = target.getAttribute("alt");
      let newMainImage = images.find((x) => x.priority == imagePriority);
      if (newMainImage != undefined) setMainImage(newMainImage);
   }
   return (
      <div className={styles.galleryBlock}>
         <div className={styles.smallImages}>
            {images.map((x) => {
               return (
                  <div
                     onClick={changeMainImage}
                     className={styles.smallImage}
                     //@ts-ignore
                     priority={x.priority}
                     key={x.priority}>
                     <Image
                        src={
                           x.name === undefined
                              ? templateImg
                              : process.env.NEXT_PUBLIC_IMAGES_URL + "/images/big/" + x.name
                        }
                        //@ts-ignore
                        alt={x.priority}
                        fill
                     />
                  </div>
               );
            })}
         </div>
         <div className={styles.imageBlock}>
            <Image
               src={
                  mainImage.name === undefined
                     ? templateImg
                     : process.env.NEXT_PUBLIC_IMAGES_URL + "/images/big/" + mainImage.name
               }
               alt={"Main image for product"}
               fill
            />
         </div>
      </div>
   );
}

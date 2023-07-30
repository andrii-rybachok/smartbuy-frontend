"use client"
import Image from "next/image";
import mainImage from "@/public/main-image.png"
import styles from "./gallery.module.css"
import { useRef, useState } from "react";
import { timeout } from "../popup/popupOvelay";

export default function Gallery(){
    const [currentImage, setCurrentImage] = useState(0);
    const block=useRef<HTMLDivElement>(null);
    const images=[
        mainImage,mainImage,mainImage,mainImage,mainImage
    ]
    setTimeout(async () => {
        let block_=block.current;
        if(block!=null){
            let images=block_?.querySelectorAll("img");
            images?.forEach(x=>x.classList.add(styles.slideLeft));
            await timeout(600);
            images?.forEach(x=>x.classList.remove(styles.slideLeft));
        }
        
        if(currentImage+1<images.length){
            setCurrentImage(currentImage+1);
        }
        else{
            setCurrentImage(0);
        }
    }, 5000);
    return(
        <div className={styles.galleryBlock} ref={block}>
            <Image src={images[currentImage]} alt={"Here is carousel gallery"} quality={100} priority />
            <Image src={currentImage+1<images.length?images[currentImage+1]:images[0]} alt={"Here is carousel gallery"} quality={100} priority/>
        </div>
    );
}
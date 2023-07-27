import Image from "next/image";
import mainImage from "@/public/main-image.png"
import styles from "./gallery.module.css"

export default function Gallery(){
    return(
        <div className={styles.galleryBlock}>
            <Image src={mainImage} alt={"Here is carousel gallery"} quality={100} />
        </div>
    );
}
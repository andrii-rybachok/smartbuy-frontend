import { ReactNode } from "react";
import styles from "./breadcrumbs.module.css";
import Link from "next/link";
import { helveticaLight } from "@/app/styles/fonts";

export interface CrumbItem {
   label: ReactNode;
   path: string;
}
export interface BreadcrumbsProps {
   items: CrumbItem[];
}
export default function Breadcrumbs({ props }: { props: BreadcrumbsProps }) {
   return (
      <div className={styles.block}>
         {props.items.map((crumb, index) => {
            const isLastItem = index === props.items.length - 1;
            if (!isLastItem) {
               return (
                  <>
                     <Link href={crumb.path} key={index} className={styles.crumb + " " + helveticaLight.className}>
                        {crumb.label}
                     </Link>
                     {}
                     <span> / </span>
                  </>
               );
            } else {
               return <span className={styles.crumb + " " + helveticaLight.className}>{crumb.label}</span>;
            }
         })}
      </div>
   );
}

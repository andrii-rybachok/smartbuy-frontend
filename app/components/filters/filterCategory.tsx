"use client";
import { usePathname } from "next/navigation";
import FilterValue from "./models/FilterValue";
import CategoryShow from "@/app/(shop)/search/models/categoryShow";
import FilterName from "./models/FilterName";
import { addFilter } from "./filter";
import Link from "next/link";

export default function CategoryFilter({ filter }: { filter: FilterName }) {
   const pathname = usePathname();
   let regexForPrice = new RegExp("(Category)");
   let decaodedPathName = decodeURIComponent(pathname);
   let linkUrl = decaodedPathName;

   function getLink(filterValue: FilterValue) {
      if (decaodedPathName.search(regexForPrice) != -1) {
         let regexForPrice = new RegExp("(Category.{0,};)");
         linkUrl = linkUrl.replace(regexForPrice, "");
      } else {
         let urlParts = linkUrl.split("/");
         let filterPart = "";
         if (urlParts.length > 3) {
            // @ts-ignore
            filterPart = urlParts.at(urlParts.length - 1);
         }
         linkUrl = addFilter(filterValue, filterPart, linkUrl, filter.name);
      }
   }
   return (
      <ul>
         {filter.values.map((filterValue,index) => {
            let value = new FilterValue(0, 0, filterValue.stringValue, filterValue.publicValue);
            getLink(value);
            return (
               <li key={index}>
                  <h5>
                     <Link href={linkUrl}>{filterValue.publicValue}</Link>
                  </h5>
               </li>
            );
         })}
      </ul>
   );
}

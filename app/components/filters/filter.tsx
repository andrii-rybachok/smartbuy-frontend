"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles/filters.module.css";
import FilterValue from "./models/FilterValue";
import FilterName from "./models/FilterName";

export function addFilter(filterValue: FilterValue, filterPart: string, linkUrl: string, filterName: string) {
   function insertAtIndex(str: string, substring: string, index: number) {
      let first_part = str.slice(0, index);
      let fds = str.slice(index);
      return first_part + substring + fds;
   }
   if (filterPart != "" && filterPart != "/") {
      let filterParts = filterPart.split(";");
      let filterNames: Array<string> = [];
      filterParts.forEach((element) => {
         let filterName = element.split("=").at(0);
         if (filterName) {
            filterNames.push(filterName);
         }
      });
      if (filterNames.includes(filterName)) {
         let regex = new RegExp("(" + filterName + "=.+?.{2,}?;)");
         let endIndex = linkUrl.search(regex);
         if (endIndex != -1) endIndex += filterName.length + 1;
         let inserValue = "";
         if (!filterValue.IsNumeric()) {
            inserValue += filterValue.stringValue + ",";
         } else {
            inserValue += filterValue.minValue + "-" + filterValue.maxValue + ",";
         }
         linkUrl = insertAtIndex(linkUrl, inserValue, endIndex);
      } else {
         if (!filterValue.IsNumeric()) {
            linkUrl += filterName + "=" + filterValue.stringValue + ";";
         } else {
            linkUrl += filterName + "=" + filterValue.minValue + "-" + filterValue.maxValue + ";";
         }
      }
   } else {
      if (filterPart == "") linkUrl += "/";
      if (!filterValue.IsNumeric()) {
         linkUrl += filterName + "=" + filterValue.stringValue + ";";
      } else {
         linkUrl += filterName + "=" + filterValue.minValue + "-" + filterValue.maxValue + ";";
      }
   }
   return linkUrl;
}

export function deleteFilter(filterValue: FilterValue, filterPart: string, linkUrl: string, filterName: string) {
   let filtersInStr = filterPart.split(";");
   let regexForValue = new RegExp("");
   let regexForFilter = new RegExp("");
   let regexForFirstFilter = new RegExp("");
   let countOfValues = 0;
   if (!filterValue.IsNumeric()) {
      regexForValue = new RegExp("(,?" + filterValue.stringValue + ")");
      regexForFilter = new RegExp("(" + filterName + "=" + filterValue.stringValue + ".?)");
      regexForFirstFilter = new RegExp("(" + filterValue.stringValue + ",?)");
   } else {
      regexForValue = new RegExp("(,?" + filterValue.minValue + "-" + filterValue.maxValue + ")");
      regexForFilter = new RegExp("(" + filterName + "=" + filterValue.minValue + "-" + filterValue.maxValue + ".?)");
      regexForFirstFilter = new RegExp("(" + filterValue.minValue + "-" + filterValue.maxValue + ",?)");
   }
   for (let index = 0; index < filtersInStr.length; index++) {
      const filterInStr = filtersInStr[index];
      if (filterInStr.search(regexForValue) != -1) {
         countOfValues = filterInStr.split(",").length;
         let values = filterInStr.split(",");
         for (let y = 0; y < values.length; y++) {
            const value = values[y];
            if (value.search(regexForValue) != -1 && y === 0) regexForValue = regexForFirstFilter;
         }
      }
      if (filterInStr.search(regexForFilter) != -1) {
         countOfValues = filterInStr.split(",").length;
      }
   }
   if (countOfValues > 1) {
      linkUrl = linkUrl.replace(regexForValue, "");
   } else if (countOfValues == 1) {
      linkUrl = linkUrl.replace(regexForFilter, "");
   }
   return linkUrl;
}

export default function Filter({ filter }: { filter: FilterName }) {
   const pathname = usePathname();
   let decaodedPathName = decodeURIComponent(pathname);
   let urlParts = decaodedPathName.split("/");
   let activeLink = false;
   let filterPart = "";
   if (urlParts.length > 3) {
      // @ts-ignore
      filterPart = urlParts.at(urlParts.length - 1);
   }
   let linkUrl = "";

   return (
      <div>
         <h5>
            {filter.publicName} | Id:{filter.id}
         </h5>
         <ul>
            {filter.values.map((filterValue) => {
               filterValue = new FilterValue(
                  filterValue.minValue,
                  filterValue.maxValue,
                  filterValue.stringValue,
                  filterValue.publicValue
               );
               linkUrl = decaodedPathName;
               let regexForString = new RegExp("(" + filterValue.stringValue + ")");
               let regexForNumbers = new RegExp("(" + filterValue.minValue + "-" + filterValue.maxValue + ")");
               if (decaodedPathName.search(regexForString) != -1 || decaodedPathName.search(regexForNumbers) != -1) {
                  linkUrl = deleteFilter(filterValue, filterPart, linkUrl, filter.name);
                  activeLink = true;
               } else {
                  linkUrl = addFilter(filterValue, filterPart, linkUrl, filter.name);
                  activeLink = false;
               }
               return (
                  <Link
                     href={linkUrl}
                     key={filterValue.publicValue}
                     prefetch={false}
                     className={activeLink ? styles.activeLink : styles.inactiveLink}>
                     <li>
                        <div>{filterValue.publicValue}</div>
                     </li>
                  </Link>
               );
            })}
         </ul>
      </div>
   );
}

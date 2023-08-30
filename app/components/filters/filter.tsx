"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles/filter.module.css";
import FilterValue from "./models/FilterValue";
import FilterName from "./models/FilterName";
import { useState } from "react";
import { helveticaLight, helveticaRoman } from "@/app/styles/fonts";

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
   const [isOpen, setIsOpen] = useState(true);
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
   function handleClick() {
      setIsOpen(!isOpen);
   }
   const filterName = (
      <div className={styles.filterNameBlock}>
         <h4 className={helveticaRoman.className}>{filter.publicName}</h4>
         {isOpen ? (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="36"
               className={styles.arrow}
               height="36"
               viewBox="0 0 36 36"
               onClick={handleClick}
               fill="none">
               <path d="M24.12 23L18 16.814L11.88 23L10 21.0863L18 13L26 21.0863L24.12 23Z" fill="#272727" />
            </svg>
         ) : (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="36"
               height="36"
               viewBox="0 0 36 36"
               fill="none"
               onClick={handleClick}
               className={styles.arrow}>
               <path d="M11.88 13L18 19.186L24.12 13L26 14.9137L18 23L10 14.9137L11.88 13Z" fill="#272727" />
            </svg>
         )}
      </div>
   );
   return (
      <div>
         {isOpen ? (
            <div>
               <div className={styles.filterBlock}>
                  {filterName}
                  <ul className={styles.filtersList}>
                     {filter.values.map((filterValue) => {
                        filterValue = FilterValue.CreateNewFilterValue(filterValue);
                        linkUrl = decaodedPathName;
                        let regexForString = new RegExp("(" + filterValue.stringValue + ")");
                        let regexForNumbers = new RegExp("(" + filterValue.minValue + "-" + filterValue.maxValue + ")");
                        if (
                           decaodedPathName.search(regexForString) != -1 ||
                           decaodedPathName.search(regexForNumbers) != -1
                        ) {
                           linkUrl = deleteFilter(filterValue, filterPart, linkUrl, filter.name);
                           activeLink = true;
                        } else {
                           linkUrl = addFilter(filterValue, filterPart, linkUrl, filter.name);
                           activeLink = false;
                        }
                        return (
                           <Link scroll={false}
                              href={linkUrl}
                              key={filterValue.publicValue}
                              prefetch={false}
                              style={{
                                 textDecoration: "none",
                              }}
                              className={activeLink ? styles.activeLink : styles.inactiveLink}>
                              <li>
                                 <div className={styles.filterValueBlock}>
                                    <h5 className={styles.filterValue + " " + helveticaLight.className}>
                                       {filterValue.publicValue}
                                    </h5>
                                    {activeLink ? (
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          className={styles.checkBox}
                                          fill="none">
                                          <rect x="0.5" y="0.5" width="15" height="15" rx="4.5" stroke="#272727" />
                                          <circle cx="8" cy="8" r="4" fill="#272727" />
                                       </svg>
                                    ) : (
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          className={styles.checkBox}
                                          fill="none">
                                          <rect x="0.5" y="0.5" width="15" height="15" rx="4.5" stroke="#272727" />
                                       </svg>
                                    )}
                                 </div>
                              </li>
                           </Link>
                        );
                     })}
                  </ul>
               </div>
            </div>
         ) : (
            <div className={styles.closedFilter}>{filterName}</div>
         )}
      </div>
   );
}

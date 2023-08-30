"use client";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import styles from "./styles/priceFilter.module.css";
import filterStyles from "./styles/filter.module.css";

import { addFilter } from "./filter";
import FilterPrice from "./models/FilterPrice";
import FilterValue from "./models/FilterValue";

export default function PriceFilter({ minPrice, maxPrice }: { minPrice: number; maxPrice: number }) {
   const router = useRouter();
   const pathname = usePathname();
   let regexForPrice = new RegExp("(Price)");
   const priceFilter: FilterPrice = {
      id: "",
      name: "Price",
      publicName: "Ціна",
      minPrice: minPrice,
      maxPrice: maxPrice,
   };
   let rangeMin = minPrice;
   let rangeMax = maxPrice;
   if (pathname.search(regexForPrice) != -1) {
      let priceInStr = pathname.match("(Price.{0,};)");
      let values = priceInStr?.at(0)?.split("-");
      let routeMinPrice = Number(values?.at(0)?.split("=").at(1));
      // @ts-ignore
      let routeMaxPrice = Number(values?.at(1)?.slice(0, values?.at(1)?.length - 1));

      if (minPrice != undefined && maxPrice != undefined) {
         priceFilter.minPrice = routeMinPrice;
         priceFilter.maxPrice = routeMaxPrice;
      }
      if (maxPrice == 0 && minPrice == 0) {
         rangeMin = routeMinPrice;
         rangeMax = routeMaxPrice;
      }
   }
   const [filter, setFilter] = useState<FilterPrice>(priceFilter);
   const [errors, setErrors] = useState<string[]>([]);

   const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      const regex = /^[0-9\b]+$/;
      if (e.currentTarget.value === "" || regex.test(e.currentTarget.value)) {
         let value = Number(e.currentTarget.value);
         if (e.currentTarget.name === "maxValue") {
            if (value >= filter.minPrice && value <= maxPrice) {
               setErrors(errors.filter((error) => error !== "maxValue"));
            } else {
               setErrors([...errors, "maxValue"]);
            }
            setFilter({
               ...filter,
               maxPrice: value,
            });
         } else {
            if (value <= filter.maxPrice && value >= minPrice) {
               setErrors(errors.filter((error) => error !== "minValue"));
            } else {
               setErrors([...errors, "minValue"]);
            }
            setFilter({
               ...filter,
               minPrice: value,
            });
         }
      }
   };

   function handleOk() {
      let decaodedPathName = decodeURIComponent(pathname);
      let linkUrl = decaodedPathName;
      if (decaodedPathName.search(regexForPrice) != -1) {
         let regexForPrice = new RegExp("(Price.{0,};)");
         linkUrl = linkUrl.replace(regexForPrice, "");
      }
      let urlParts = linkUrl.split("/");
      let filterPart = "";
      if (urlParts.length > 3) {
         // @ts-ignore
         filterPart = urlParts.at(urlParts.length - 1);
      }
      let priceValue: FilterValue = new FilterValue(filter.minPrice, filter.maxPrice, undefined, "");
      linkUrl = addFilter(priceValue, filterPart, linkUrl, filter.name);
      router.replace(linkUrl);
   }
   function setLeftValue(event: any) {
      let value = parseInt(event.target.value);
      if (value < filter.maxPrice) {
         setFilter({
            ...filter,
            minPrice: value,
         });
      }
   }
   function setRightValue(event: any) {
      let value = parseInt(event.target.value);
      if (value > filter.minPrice) {
         setFilter({
            ...filter,
            maxPrice: value,
         });
      }
   }
   let progress = (filter.minPrice - minPrice) / (maxPrice - minPrice);
   return (
      <div className={styles.block}>
         <h4 className={filterStyles.filterName + " " + styles.ml_15}>{filter.publicName}</h4>
         <div className={styles.priceBox}>
            <input
               type="text"
               name="minValue"
               onChange={handleChange}
               value={filter.minPrice}
               className={
                  errors.includes("minValue")
                     ? styles.priceValidated
                     : "" + " " + styles.priceBlock + " " + filterStyles.filterName
               }
            />
            <input
               type="text"
               name="maxValue"
               onChange={handleChange}
               value={filter.maxPrice}
               className={
                  errors.includes("maxValue")
                     ? styles.priceValidated
                     : "" + " " + styles.priceBlock + " " + filterStyles.filterName
               }
            />
            <button onClick={handleOk}>OK</button>
         </div>
         <div className={styles.range}>
            <div className={styles["range-slider"]}>
               <span
                  className={styles["range-selected"]}
                  style={{
                     left:
                        filter.minPrice == rangeMin
                           ? "0%"
                           : ((filter.minPrice - rangeMin) / (rangeMax - rangeMin)) * 100 + "%",
                     right: 100 - ((filter.maxPrice - rangeMin) / (rangeMax - rangeMin)) * 100 + "%",
                  }}></span>
            </div>
            <div className={styles["range-input"]}>
               <input
                  type="range"
                  onInput={setLeftValue}
                  className={styles.rangePrice}
                  min={rangeMin}
                  max={rangeMax}
                  value={filter.minPrice}
                  step={1}
               />
               <input
                  type="range"
                  onInput={setRightValue}
                  className={styles.rangePrice}
                  min={rangeMin}
                  max={rangeMax}
                  value={filter.maxPrice}
                  step={1}
               />
            </div>
         </div>
      </div>
   );
}

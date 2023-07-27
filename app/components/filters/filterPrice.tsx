"use client";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import styles from "./styles/priceFilter.module.css";
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
   if (pathname.search(regexForPrice) != -1) {
      let priceInStr = pathname.match("(Price.{0,};)");
      let values = priceInStr?.at(0)?.split("-");
      let minPrice = Number(values?.at(0)?.split("=").at(1));
      // @ts-ignore
      let maxPrice = Number(values?.at(1)?.slice(0, values?.at(1)?.length - 1));
      if (minPrice != undefined && maxPrice != undefined) {
         priceFilter.maxPrice = maxPrice;
         priceFilter.minPrice = minPrice;
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
   return (
      <div>
         <h4>{filter.publicName}</h4>
         <div>
            <input
               type="text"
               name="minValue"
               onChange={handleChange}
               value={filter.minPrice}
               className={errors.includes("minValue") ? styles.priceValidated : ""}
            />
            <span>-</span>
            <input
               type="text"
               name="maxValue"
               onChange={handleChange}
               value={filter.maxPrice}
               className={errors.includes("maxValue") ? styles.priceValidated : ""}
            />
            <button onClick={handleOk} disabled={errors.length > 0 ? true : false}>
               ОК
            </button>
         </div>
      </div>
   );
}

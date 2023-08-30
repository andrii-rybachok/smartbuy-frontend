// "use client";
import PriceFilter from "./filterPrice";
import Filter from "./filter";
import FilterName from "./models/FilterName";
import CategoryFilter from "./filterCategory";
import { helveticaRoman } from "@/app/styles/fonts";
import styles from "./styles/filters.module.css";
import { usePathname } from "next/navigation";
export default function Filters({ filters }: { filters: FilterName[] }) {
   // const pathname = usePathname();
   let priceFilter = filters.find((x) => x.name === "Price");
   // // @ts-ignore
   // let minPrice = priceFilter.values.at(0)?.minValue;
   // // @ts-ignore
   // let maxPrice = priceFilter.values.at(0)?.maxValue;
   // if (priceFilter != undefined) {
   // // @ts-ignore
   //    if (maxPrice-minPrice== 0) {
   //       let regexForPrice = new RegExp("(Price)");
   //       if (pathname.search(regexForPrice) != -1) {
   //          let priceInStr = pathname.match("(Price.{0,};)");
   //          let values = priceInStr?.at(0)?.split("-");
   //          let routeMinPrice = Number(values?.at(0)?.split("=").at(1));
   //          // @ts-ignore
   //          let routeMaxPrice = Number(values?.at(1)?.slice(0, values?.at(1)?.length - 1));

   //          if (minPrice != undefined && maxPrice != undefined) {
   //             minPrice = routeMinPrice;
   //             maxPrice = routeMaxPrice;
   //          }
   //       }
   //    }
   // }
   let categoryFilter = filters.find((x) => x.name === "Category");
   return (
      <aside className={helveticaRoman.className + " " + styles.filters}>
         {categoryFilter != undefined && <CategoryFilter filter={categoryFilter} />}
         {priceFilter != undefined && (
            // @ts-ignore
            <PriceFilter minPrice={priceFilter.values.at(0)?.minValue} maxPrice={priceFilter.values.at(0)?.maxValue} />
         )}
         {filters.map((filter) => {
            if (filter.name !== "Price" && filter.name !== "Category") return <Filter filter={filter} />;
         })}
      </aside>
   );
}

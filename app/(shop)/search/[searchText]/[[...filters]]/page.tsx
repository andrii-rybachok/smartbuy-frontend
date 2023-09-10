import { redirect } from "next/navigation";
import Filters from "@/app/components/filters/filters";
import FilterNameDTO from "@/app/models/filterDTO/FilterNameDTO";
import getFiltersFromUriString from "@/app/lib/filter-service";
import SearchResponse from "@/app/(shop)/search/models/searchResponse";
import CatalogSection from "@/app/components/categories/CatalogSection";
import { helveticaMedium, helveticaRoman } from "@/app/styles/fonts";
import styles from "../../search.module.css";
async function GetProductsOrCateogry(searchString: string) {
   let params = new URLSearchParams({
      searchText: searchString,
   });
   let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/search?" + params, {
      method: "POST",
      cache: "no-cache",
   });
   if (res.status != 404) {
      const result = await res.json();
      if (result.categoryId != undefined) {
         redirect("/categories/" + result.categoryId);
      } else {
         return result;
      }
   }
}

async function FilterProducts(searchString: string, stringFilters: string) {
   let filters: FilterNameDTO[] | undefined = getFiltersFromUriString(stringFilters);
   let params = new URLSearchParams({
      searchText: searchString,
   });
   let fetchOptions: any = {
      method: "POST",
      cache: "no-cache",
   };
   if (filters != undefined) {
      if (filters.length > 0) {
         fetchOptions.body = JSON.stringify(filters);
      }
      let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/search?" + params, {
         ...fetchOptions,
         headers: {
            "Content-Type": "application/json",
         },
      });
      return res.json();
   }
   return GetProductsOrCateogry(searchString);
}

export default async function SearchPage({
   params: { searchText, filters },
}: {
   params: { searchText: string; filters: string };
}) {
   const text = decodeURI(searchText);
   let response: SearchResponse;

   if (filters !== "") {
      response = await FilterProducts(text, filters);
   } else {
      response = await GetProductsOrCateogry(text);
   }
   return (
      <div>
         <h1 className={helveticaRoman.className + " " + styles.searchParams}>Результати пошуку "{text}"</h1>
         <div>
            <CatalogSection filters={response.filters} products={response.products} />
         </div>
      </div>
   );
}

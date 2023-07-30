import { redirect } from "next/navigation";
import Filters from "@/app/components/filters/filters";
import FilterNameDTO from "@/app/models/filterDTO/FilterNameDTO";
import getFiltersFromUriString from "@/app/lib/filter-service";
import SearchResponse from "@/app/(shop)/search/models/searchResponse";

async function GetProductsOrCateogry(searchString: string) {
   let params = new URLSearchParams({
      searchText: searchString,
   });
   let res = await fetch("http://127.0.0.1:7196/api/shop/search?" + params, {
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
      // let categoryFilter = filters.find((x) => x.name == "Category");
      // if (categoryFilter != undefined) {
      //    //@ts-ignore
      //    params.append("categoryId", categoryFilter.values.at(0)?.stringValue);
      //    const index = filters.indexOf(categoryFilter);
      //    filters.splice(index, 1);
      // }
      if (filters.length > 0) {
         fetchOptions.body = JSON.stringify(filters);
      }
      let res = await fetch("http://127.0.0.1:7196/api/shop/search?" + params, {
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
         <h1>{text}</h1>
         <div>
            {response.products.map((product) => {
               return (
                  <div key={product.id}>
                     <h1>{product.name}</h1>
                  </div>
               );
            })}
         </div>
         <hr />
         <div>
            <Filters filters={response.filters} />
         </div>
      </div>
   );
}

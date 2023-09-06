
import GlobalCategoryResponse from "../requests/GlobalCategoryResponse";
import getFiltersFromUriString from "@/app/lib/filter-service";

import TopContent from "@/app/components/categories/topContent";
//@ts-ignore
import CatalogSection from "@/app/components/categories/CatalogSection";


async function GetGlobalCategory(glCategoryId: string, filterParam: string) {
   let params = new URLSearchParams({
      id: glCategoryId,
   });
   let filters = getFiltersFromUriString(filterParam);
   if (filters != undefined) {
      const res = await fetch("http://127.0.0.1:7196/api/shop/globalCategory-filter?" + params, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         cache: "no-cache",
         body: JSON.stringify(filters),
      });
      return res.json();
   }
   const res = await fetch("http://127.0.0.1:7196/api/shop/globalCategoryCatalog?" + params, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
      cache: "no-cache",
   });
   return res.json();
}
export default async function GlobalCategory({
   params: { glCategoryId, filters },
}: {
   params: { glCategoryId: string; filters: string };
}) {
   const response: GlobalCategoryResponse = await GetGlobalCategory(glCategoryId, filters);
   const categories = response.globalCategory.categories;
   return (
      <section>
         <TopContent globalCategory={response.globalCategory} />
         <CatalogSection filters={response.filters} products={response.products} />
      </section>
   );
}

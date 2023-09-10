import getFiltersFromUriString from "@/app/lib/filter-service";
import CategoryDetail from "@/app/(shop)/categories/models/CategoryDetail";
import Breadcrumbs from "@/app/components/breadcrumbs/Breadcrumbs";

import GlobalCategory from "@/app/(shop)/categories/models/GlobalCategory";
import TopContent from "@/app/components/categories/topContent";
import CatalogSection from "@/app/components/categories/CatalogSection";

async function getCategory(categoryId: string, filterParam: string) {
   let params = new URLSearchParams({
      categoryId: categoryId,
   });
   let filters = getFiltersFromUriString(filterParam);
   if (filters != undefined) {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/category-filter?" + params, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         cache: "no-cache",
         body: JSON.stringify(filters),
      });
      return res.json();
   }
   const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/get-category?" + params, {
      cache: "no-cache",
   });
   return res.json();
}
async function getGlobalCategory(categoryId: string) {
   let params = new URLSearchParams({
      id: categoryId,
   });
   const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/globalCategoryId?" + params, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
      cache: "no-cache",
   });
   return res.json();
}

export default async function CategoryPage({
   params: { categoryId, filters },
}: {
   params: { categoryId: string; filters: string };
}) {
   const category: CategoryDetail = await getCategory(categoryId, filters);
   const globalCategory: GlobalCategory = await getGlobalCategory(categoryId);

   return (
      <section>
         <Breadcrumbs
            props={{
               items: [
                  {
                     label: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                           <path
                              d="M15.75 8.12463V14.625C15.75 14.9234 15.6315 15.2095 15.4205 15.4205C15.2095 15.6315 14.9234 15.75 14.625 15.75H11.8125C11.5141 15.75 11.228 15.6315 11.017 15.4205C10.806 15.2095 10.6875 14.9234 10.6875 14.625V11.8125C10.6875 11.6633 10.6282 11.5203 10.5227 11.4148C10.4173 11.3093 10.2742 11.25 10.125 11.25H7.875C7.72582 11.25 7.58274 11.3093 7.47725 11.4148C7.37176 11.5203 7.3125 11.6633 7.3125 11.8125V14.625C7.3125 14.9234 7.19397 15.2095 6.983 15.4205C6.77202 15.6315 6.48587 15.75 6.1875 15.75H3.375C3.07663 15.75 2.79048 15.6315 2.5795 15.4205C2.36853 15.2095 2.25 14.9234 2.25 14.625V8.12463C2.24998 7.96893 2.28227 7.81492 2.34485 7.67235C2.40742 7.52978 2.4989 7.40174 2.61352 7.29635L8.23852 1.98917L8.24625 1.98143C8.45335 1.79309 8.72323 1.68872 9.00316 1.68872C9.2831 1.68872 9.55298 1.79309 9.76008 1.98143C9.76248 1.98418 9.76506 1.98677 9.76781 1.98917L15.3928 7.29635C15.5063 7.4023 15.5966 7.53058 15.6581 7.67313C15.7195 7.81567 15.7508 7.9694 15.75 8.12463Z"
                              fill="#272727"
                           />
                        </svg>
                     ),
                     path: "/",
                  },
                  {
                     label: globalCategory.name,
                     path: "/categories/" + globalCategory.id,
                  },
                  {
                     label: category.name,
                     path: "/categories",
                  },
               ],
            }}
         />
         <TopContent globalCategory={globalCategory} activeCategoryId={categoryId} />
         <CatalogSection filters={category.filters} products={category.products} />
      </section>
   );
}

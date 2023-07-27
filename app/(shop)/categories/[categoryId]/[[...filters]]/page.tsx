import Filters from "@/app/components/filters/filters";
import getFiltersFromUriString from "@/app/lib/filter-service";
import CategoryDetail from "@/app/(shop)/categories/models/CategoryDetail";

async function getCategory(categoryId: string, filterParam: string) {
   let params = new URLSearchParams({
      categoryId: categoryId,
   });
   let filters = getFiltersFromUriString(filterParam);
   if (filters != undefined) {
      const res = await fetch("http://127.0.0.1:7196/api/shop/product-filter?" + params, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         cache: "no-cache",
         body: JSON.stringify(filters),
      });
      return res.json();
   }
   const res = await fetch("http://127.0.0.1:7196/api/shop/get-category?" + params, {
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
   return (
      <section>
         <h2>{category.name}</h2>
         <div>
            {category.products.map((product) => {
               return (
                  <div key={product.id}>
                     <h4>
                        {product.name} | Id:{product.id}
                     </h4>
                     <p>{product.price}</p>
                  </div>
               );
            })}
            <hr />
            <div>{<Filters filters={category.filters} />}</div>
         </div>
      </section>
   );
}

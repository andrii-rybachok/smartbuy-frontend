import PriceFilter from "./filterPrice";
import Filter from "./filter";
import FilterName from "./models/FilterName";
import CategoryFilter from "./filterCategory";

export default function Filters({ filters }: { filters: FilterName[] }) {

   let priceFilter = filters.find((x) => x.name === "Price");
   let categoryFilter=filters.find((x) => x.name === "Category");
   return (
      <aside>
         {categoryFilter != undefined && (
            <CategoryFilter filter={categoryFilter} />
         )}
         {priceFilter != undefined && (
            // @ts-ignore
            <PriceFilter minPrice={priceFilter.values.at(0)?.minValue} maxPrice={priceFilter.values.at(0)?.maxValue} />
         )}
         {filters.map((filter) => {
            if (filter.name !== "Price" &&filter.name!=="Category") return <Filter filter={filter} />;
         })}
      </aside>
   );
}

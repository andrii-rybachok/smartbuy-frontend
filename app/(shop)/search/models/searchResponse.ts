import FilterName from "@/app/components/filters/models/FilterName";

import ProductShow from "./productShow";

export default interface SearchResponse {
   categoryId: string;
   products: Array<ProductShow>;
   filters: FilterName[];
}

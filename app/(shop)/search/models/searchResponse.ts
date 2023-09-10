import FilterName from "@/app/components/filters/models/FilterName";

import ProductShow from "./productShow";
import ProductItem from "@/app/models/products/productItem";

export default interface SearchResponse {
   categoryId: string;
   products: Array<ProductItem>;
   filters: FilterName[];
}

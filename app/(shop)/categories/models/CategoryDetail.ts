import FilterName from "@/app/components/filters/models/FilterName";
import ProductItem from "./products/products";

export default interface CategoryDetail {
   name: string;
   description: string;
   filters: FilterName[];
   products: ProductItem[];
}

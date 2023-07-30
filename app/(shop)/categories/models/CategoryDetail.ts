import FilterName from "@/app/components/filters/models/FilterName";
import ProductItem from "@/app/models/products/productItem";

export default interface CategoryDetail {
   name: string;
   description: string;
   filters: FilterName[];
   products: ProductItem[];
}

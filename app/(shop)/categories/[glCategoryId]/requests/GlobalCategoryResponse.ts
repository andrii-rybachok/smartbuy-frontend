import FilterName from "@/app/components/filters/models/FilterName";
import ProductShow from "../../../search/models/productShow";
import ProductItem from "@/app/models/products/productItem";
import GlobalCategory from "../../models/GlobalCategory";

export default interface GlobalCategoryResponse {
   filters: FilterName[];
   products: ProductItem[];
   globalCategory: GlobalCategory;
}

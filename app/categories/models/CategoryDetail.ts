import FilterName from "./filters/FilterName";
import ProductItem from "./products/ProductItem";

export default interface CategoryDetail{
    name:string,
    description:string,
    filters:FilterName[],
    products:ProductItem[]
}
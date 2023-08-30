import ProductItem from "@/app/models/products/productItem";
import Filters from "../filters/filters";
import FilterName from "../filters/models/FilterName";
import ProductCatalog from "../productGallery/productCatalog";
import styles from "./categoriesColumn.module.css";

export default function CatalogSection({ filters, products }: { filters: FilterName[]; products: ProductItem[] }) {
   return (
      <div className={styles.productSection}>
         <Filters filters={filters} />
         <ProductCatalog products={products} />
      </div>
   );
}

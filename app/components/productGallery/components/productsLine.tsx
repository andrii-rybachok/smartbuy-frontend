import ProductItem from "@/app/models/products/productItem";
import Product from "./product";
import styles from "./product.module.css";
export default function ProductsLine({ products }: { products: ProductItem[] }) {
   return (
      <div className={styles.products}>
         {products.map((product) => {
            return <Product key={product.id} product={product} />;
         })}
      </div>
   );
}

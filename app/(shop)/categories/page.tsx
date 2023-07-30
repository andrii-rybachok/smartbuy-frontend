import Link from "next/link";
import CategoryItem from "./models/CategoryItem";

async function getCategories() {
   const res = await fetch("http://127.0.0.1:7196/api/shop/categories",{cache:"no-cache"});
   return res.json();
}

export default async function Categories() {
   const categories: CategoryItem[] = await getCategories();
   return (
      <section>
         {categories.map((x) => {
            return (
               <div key={x.id}>
                  <Link href={"/categories/" + x.id + "/"}>
                     <h4>
                        {x.name} | Id:{x.id}
                     </h4>
                     <p>{x.description}</p>
                  </Link>
               </div>
            );
         })}
      </section>
   );
}

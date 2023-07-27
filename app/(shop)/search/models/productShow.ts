import CategoryShow from "./categoryShow";

export default interface ProductShow {
   id: string;
   name: string;
   shortDescription: string;
   price: number;
   category: CategoryShow;
}

import CategoryItem from "./CategoryItem";

export default interface GlobalCategory {
   id: string;
   name:string;
   image: string;
   categories: CategoryItem[];
}

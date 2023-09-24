import Characteristic from "./Characteristic";
import AppImage from "./Image";

export default interface ProductDetail {
   id: number;
   name: string;
   description: string;
   price: number;
   images: AppImage[];
   characteristics: Characteristic[];
}

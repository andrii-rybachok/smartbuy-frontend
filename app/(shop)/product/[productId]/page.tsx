import ProductDetail from "../models/ProductDetail";
import Image from "next/image";
import templateImg from "@/public/productTemplate.png";
import profileImg from "public/profile-template.png";

import styles from "../styles/page.module.css";
import ProductImages from "@/app/components/productDetail/productImages";
import Breadcrumbs from "@/app/components/breadcrumbs/Breadcrumbs";
import ProductCharac from "@/app/components/productDetail/productCharacteristics";
import { helveticaLight, helveticaMedium, helveticaRoman } from "@/app/styles/fonts";
import Link from "next/link";
import ProductGallery from "@/app/components/productGallery/productGallery";
async function getProduct(id: string) {
   let params = new URLSearchParams({
      id: id,
   });
   //process.env.NEXT_PUBLIC_BACKEND_URL
   const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/productById?" + params, {
      cache: "no-cache",
   });
   return res.json();
}
async function getPromotedProducts() {
   const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/promoted-products");
   return res.json();
}
export default async function Product({ params: { productId } }: { params: { productId: string } }) {
   let product: ProductDetail = await getProduct(productId);
   const promotedProductsData = getPromotedProducts();
   const [promotedProducts] = await Promise.all([promotedProductsData]);
   return (
      <div>
         <Breadcrumbs
            props={{
               items: [
                  {
                     label: (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                           <path
                              d="M15.75 8.12463V14.625C15.75 14.9234 15.6315 15.2095 15.4205 15.4205C15.2095 15.6315 14.9234 15.75 14.625 15.75H11.8125C11.5141 15.75 11.228 15.6315 11.017 15.4205C10.806 15.2095 10.6875 14.9234 10.6875 14.625V11.8125C10.6875 11.6633 10.6282 11.5203 10.5227 11.4148C10.4173 11.3093 10.2742 11.25 10.125 11.25H7.875C7.72582 11.25 7.58274 11.3093 7.47725 11.4148C7.37176 11.5203 7.3125 11.6633 7.3125 11.8125V14.625C7.3125 14.9234 7.19397 15.2095 6.983 15.4205C6.77202 15.6315 6.48587 15.75 6.1875 15.75H3.375C3.07663 15.75 2.79048 15.6315 2.5795 15.4205C2.36853 15.2095 2.25 14.9234 2.25 14.625V8.12463C2.24998 7.96893 2.28227 7.81492 2.34485 7.67235C2.40742 7.52978 2.4989 7.40174 2.61352 7.29635L8.23852 1.98917L8.24625 1.98143C8.45335 1.79309 8.72323 1.68872 9.00316 1.68872C9.2831 1.68872 9.55298 1.79309 9.76008 1.98143C9.76248 1.98418 9.76506 1.98677 9.76781 1.98917L15.3928 7.29635C15.5063 7.4023 15.5966 7.53058 15.6581 7.67313C15.7195 7.81567 15.7508 7.9694 15.75 8.12463Z"
                              fill="#272727"
                           />
                        </svg>
                     ),
                     path: "/",
                  },
                  {
                     label: product.name,
                     path: "",
                  },
               ],
            }}
         />
         <div className={styles.main}>
            <section>
               <ProductImages images={product.images} />
               <ProductCharac charac={product.characteristics} desc={product.description} />
            </section>
            <section className={helveticaRoman.className}>
               <div>
                  <h1 className={styles.name + " " + helveticaMedium.className}>{product.name}</h1>
                  <div>
                     <div className={styles.details}>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="108"
                           height="20"
                           viewBox="0 0 108 20"
                           fill="none">
                           <path
                              d="M9.6924 0L11.8685 6.90983H18.9104L13.2134 11.1803L15.3894 18.0902L9.6924 13.8197L3.99535 18.0902L6.17143 11.1803L0.47438 6.90983H7.51632L9.6924 0Z"
                              fill="#FED766"
                           />
                           <path
                              d="M31.751 0L33.9271 6.90983H40.969L35.272 11.1803L37.448 18.0902L31.751 13.8197L26.0539 18.0902L28.23 11.1803L22.533 6.90983H29.5749L31.751 0Z"
                              fill="#FED766"
                           />
                           <path
                              d="M31.751 0L33.9271 6.90983H40.969L35.272 11.1803L37.448 18.0902L31.751 13.8197L26.0539 18.0902L28.23 11.1803L22.533 6.90983H29.5749L31.751 0Z"
                              fill="#FED766"
                           />
                           <path
                              d="M53.8096 0L55.9857 6.90983H63.0276L57.3306 11.1803L59.5066 18.0902L53.8096 13.8197L48.1125 18.0902L50.2886 11.1803L44.5916 6.90983H51.6335L53.8096 0Z"
                              fill="#FED766"
                           />
                           <path
                              d="M75.8682 0L78.0443 6.90983H85.0862L79.3891 11.1803L81.5652 18.0902L75.8682 13.8197L70.1711 18.0902L72.3472 11.1803L66.6502 6.90983H73.6921L75.8682 0Z"
                              fill="#FED766"
                           />
                           <path
                              d="M97.9268 0L100.103 6.90983H107.145L101.448 11.1803L103.624 18.0902L97.9268 13.8197L92.2297 18.0902L94.4058 11.1803L88.7088 6.90983H95.7507L97.9268 0Z"
                              fill="#FED766"
                           />
                        </svg>
                        <span className={styles.reviews}>3 відгуки</span>
                        <span className={styles.reviews}>AA1234BB</span>
                     </div>
                     <div className={styles.details + " " + styles.m40}>
                        <h2 className={styles.price + " " + helveticaMedium.className}>
                           {product.price}{" "}
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none">
                              <path
                                 d="M13.144 8.48485H16.625V6.36364H14.91C15.3387 5.66364 15.6042 4.96364 15.6042 4.24242C15.6042 1.45303 13.0521 0 10.5 0C8.10104 0 5.93687 2.18485 5.69187 2.42879L7.14146 3.93485C7.63146 3.42576 9.18313 2.12121 10.5 2.12121C11.5617 2.12121 13.5625 2.56667 13.5625 4.24242C13.5625 4.77273 13.0521 5.55758 12.2967 6.36364H4.375V8.48485H10.1223C9.69354 8.86667 8.20312 10.2561 7.85604 10.6061H4.375V12.7273H6.09C5.66125 13.4273 5.39583 14.1273 5.39583 14.8485C5.39583 17.6379 7.94792 19.0909 10.5 19.0909C12.899 19.0909 15.0631 16.9061 15.3081 16.6621L13.8585 15.1561C13.3787 15.6652 11.8169 16.9697 10.5 16.9697C9.43833 16.9697 7.4375 16.5242 7.4375 14.8485C7.4375 14.3182 7.94792 13.5333 8.70333 12.7273H16.625V10.6061H10.8879L13.144 8.48485Z"
                                 fill="#272727"
                              />
                           </svg>
                        </h2>
                        <button className={styles.buyBtn}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 34 34"
                              fill="none">
                              <path
                                 d="M12.8039 17.6269C12.0166 17.6269 11.3238 17.1964 10.9669 16.5454L7.2089 9.7309C7.12043 9.57175 7.07504 9.39225 7.07722 9.21016C7.07941 9.02807 7.12909 8.84971 7.22134 8.69273C7.3136 8.53574 7.44524 8.40557 7.60323 8.3151C7.76122 8.22463 7.94009 8.17699 8.12214 8.1769L23.6579 8.1769L24.6446 6.0769L28.0771 6.0769L28.0771 8.1769L25.9777 8.1769L22.1988 16.1464L23.6159 18.7084C24.3822 20.1154 23.3744 21.8269 21.7789 21.8269L9.18235 21.8269L9.18235 19.7269L21.7789 19.7269L20.6242 17.6269L12.8039 17.6269ZM22.6606 10.2769L9.90665 10.2769L12.8039 15.5269L20.1728 15.5269L22.6606 10.2769ZM21.7789 22.8769C22.9336 22.8769 23.8678 23.8219 23.8678 24.9769C23.8678 26.1319 22.9336 27.0769 21.7789 27.0769C20.6242 27.0769 19.6795 26.1319 19.6795 24.9769C19.6795 23.8219 20.6242 22.8769 21.7789 22.8769ZM11.2818 22.8769C12.4365 22.8769 13.3707 23.8219 13.3707 24.9769C13.3707 26.1319 12.4365 27.0769 11.2818 27.0769C10.1271 27.0769 9.18235 26.1319 9.18235 24.9769C9.18235 23.8219 10.1271 22.8769 11.2818 22.8769Z"
                                 fill="white"
                              />
                           </svg>
                           Купити
                        </button>
                        <button className={styles.cartBtn}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="34"
                              height="34"
                              viewBox="0 0 34 34"
                              fill="none">
                              <path
                                 d="M12.8039 17.6269C12.0166 17.6269 11.3238 17.1964 10.9669 16.5454L7.2089 9.7309C7.12043 9.57175 7.07504 9.39225 7.07722 9.21016C7.07941 9.02807 7.12909 8.84971 7.22134 8.69273C7.3136 8.53574 7.44524 8.40557 7.60323 8.3151C7.76122 8.22463 7.94009 8.17699 8.12214 8.1769L23.6579 8.1769L24.6446 6.0769L28.0771 6.0769L28.0771 8.1769L25.9777 8.1769L22.1988 16.1464L23.6159 18.7084C24.3822 20.1154 23.3744 21.8269 21.7789 21.8269L9.18235 21.8269L9.18235 19.7269L21.7789 19.7269L20.6242 17.6269L12.8039 17.6269ZM22.6606 10.2769L9.90665 10.2769L12.8039 15.5269L20.1728 15.5269L22.6606 10.2769ZM21.7789 22.8769C22.9336 22.8769 23.8678 23.8219 23.8678 24.9769C23.8678 26.1319 22.9336 27.0769 21.7789 27.0769C20.6242 27.0769 19.6795 26.1319 19.6795 24.9769C19.6795 23.8219 20.6242 22.8769 21.7789 22.8769ZM11.2818 22.8769C12.4365 22.8769 13.3707 23.8219 13.3707 24.9769C13.3707 26.1319 12.4365 27.0769 11.2818 27.0769C10.1271 27.0769 9.18235 26.1319 9.18235 24.9769C9.18235 23.8219 10.1271 22.8769 11.2818 22.8769Z"
                                 fill="#0EA47A"
                              />
                           </svg>
                           В кошик
                        </button>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           className={styles.like}>
                           <path
                              d="M11.2232 19.2905L11.2217 19.2892C8.62708 16.9364 6.55406 15.0515 5.11801 13.2946C3.69296 11.5512 3 10.0562 3 8.5C3 5.96348 4.97109 4 7.5 4C8.9377 4 10.3341 4.67446 11.2412 5.73128L12 6.61543L12.7588 5.73128C13.6659 4.67446 15.0623 4 16.5 4C19.0289 4 21 5.96348 21 8.5C21 10.0562 20.307 11.5512 18.882 13.2946C17.4459 15.0515 15.3729 16.9364 12.7783 19.2892L12.7768 19.2905L12 19.9977L11.2232 19.2905Z"
                              stroke="#0EA47A"
                              stroke-width="2"
                           />
                        </svg>
                     </div>
                     <div className={styles.info}>
                        <div>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="30"
                              viewBox="0 0 24 30"
                              fill="none">
                              <path
                                 d="M20.332 16.7625C19.284 18.7537 17.864 20.7375 16.412 22.5188C15.0346 24.198 13.5618 25.8066 12 27.3375C10.4382 25.8066 8.96537 24.1981 7.588 22.5188C6.136 20.7375 4.716 18.7537 3.668 16.7625C2.608 14.7506 2 12.8663 2 11.25C2 8.7636 3.05357 6.37903 4.92893 4.62087C6.8043 2.86272 9.34784 1.875 12 1.875C14.6522 1.875 17.1957 2.86272 19.0711 4.62087C20.9464 6.37903 22 8.7636 22 11.25C22 12.8663 21.39 14.7506 20.332 16.7625ZM12 30C12 30 24 19.3387 24 11.25C24 8.26631 22.7357 5.40483 20.4853 3.29505C18.2348 1.18526 15.1826 0 12 0C8.8174 0 5.76515 1.18526 3.51472 3.29505C1.26428 5.40483 4.74244e-08 8.26631 0 11.25C0 19.3387 12 30 12 30Z"
                                 fill="#272727"
                              />
                              <path
                                 d="M12 15C10.9391 15 9.92172 14.6049 9.17157 13.9017C8.42143 13.1984 8 12.2446 8 11.25C8 10.2554 8.42143 9.30161 9.17157 8.59835C9.92172 7.89509 10.9391 7.5 12 7.5C13.0609 7.5 14.0783 7.89509 14.8284 8.59835C15.5786 9.30161 16 10.2554 16 11.25C16 12.2446 15.5786 13.1984 14.8284 13.9017C14.0783 14.6049 13.0609 15 12 15ZM12 16.875C13.5913 16.875 15.1174 16.2824 16.2426 15.2275C17.3679 14.1726 18 12.7418 18 11.25C18 9.75816 17.3679 8.32742 16.2426 7.27252C15.1174 6.21763 13.5913 5.625 12 5.625C10.4087 5.625 8.88258 6.21763 7.75736 7.27252C6.63214 8.32742 6 9.75816 6 11.25C6 12.7418 6.63214 14.1726 7.75736 15.2275C8.88258 16.2824 10.4087 16.875 12 16.875Z"
                                 fill="#272727"
                              />
                           </svg>
                           <span>Доставка в місто:</span>
                           <span className={styles.city}>Рівне</span>
                        </div>
                        <div>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="29"
                              viewBox="0 0 23 29"
                              fill="none">
                              <path
                                 d="M21.5081 13.3331C21.5081 12.046 21.1264 10.7877 20.4113 9.71752C19.6962 8.64729 18.6798 7.81315 17.4906 7.32058C16.3014 6.82801 14.9929 6.69913 13.7305 6.95024C12.4681 7.20135 11.3085 7.82117 10.3983 8.73133C9.48817 9.64148 8.86835 10.8011 8.61724 12.0635C8.36613 13.3259 8.495 14.6344 8.98757 15.8236C9.48014 17.0128 10.3143 18.0292 11.3845 18.7443C12.4547 19.4594 13.713 19.8411 15.0001 19.8411V13.3331H21.5081Z"
                                 fill="#0EA47A"
                              />
                              <path
                                 d="M15.0002 2.69842C13.6036 2.69842 12.2206 2.9735 10.9303 3.50796C9.64006 4.04241 8.46767 4.82577 7.48013 5.81332C6.49259 6.80086 5.70922 7.97325 5.17477 9.26353C4.64031 10.5538 4.36523 11.9367 4.36523 13.3333C4.36523 14.7299 4.64031 16.1129 5.17477 17.4032C5.70922 18.6934 6.49259 19.8658 7.48013 20.8534C8.46767 21.8409 9.64006 22.6243 10.9303 23.1587C12.2206 23.6932 13.6036 23.9683 15.0002 23.9683L15.0002 21.6787C13.9042 21.6787 12.819 21.4629 11.8065 21.0435C10.794 20.6241 9.874 20.0094 9.09906 19.2344C8.32412 18.4595 7.7094 17.5395 7.29 16.527C6.87061 15.5145 6.65475 14.4293 6.65475 13.3333C6.65475 12.2374 6.87061 11.1522 7.29 10.1397C7.7094 9.12718 8.32412 8.20719 9.09906 7.43225C9.874 6.6573 10.794 6.04259 11.8065 5.62319C12.819 5.20379 13.9042 4.98793 15.0002 4.98793L15.0002 2.69842Z"
                                 fill="#0EA47A"
                              />
                              <path
                                 d="M15 28.3332C13.0302 28.3332 11.0796 27.9453 9.25975 27.1914C7.43987 26.4376 5.78628 25.3327 4.3934 23.9398C3.00052 22.547 1.89563 20.8934 1.14181 19.0735C0.38799 17.2536 3.07292e-06 15.3031 3.15903e-06 13.3332L2.45548 13.3332C2.45548 14.9806 2.77996 16.6119 3.41038 18.1338C4.0408 19.6558 4.96482 21.0387 6.12969 22.2036C7.29455 23.3684 8.67745 24.2925 10.1994 24.9229C11.7214 25.5533 13.3526 25.8778 15 25.8778L15 28.3332Z"
                                 fill="#0EA47A"
                              />
                           </svg>
                           <span>Самовивіз з точок видачі Smartbuy</span>
                           <Link href={"#"}>Дивитись на мапі</Link>
                        </div>
                        <div>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none">
                              <path
                                 d="M3.63965 19.7428C3.63965 20.3945 3.89133 21.0194 4.33934 21.4803C4.78734 21.9411 5.39497 22.1999 6.02854 22.1999C6.66211 22.1999 7.26974 21.9411 7.71774 21.4803C8.16574 21.0194 8.41743 20.3945 8.41743 19.7428C8.41743 19.0911 8.16574 18.4661 7.71774 18.0053C7.26974 17.5445 6.66211 17.2856 6.02854 17.2856C5.39497 17.2856 4.78734 17.5445 4.33934 18.0053C3.89133 18.4661 3.63965 19.0911 3.63965 19.7428ZM15.5841 19.7428C15.5841 20.3945 15.8358 21.0194 16.2838 21.4803C16.7318 21.9411 17.3394 22.1999 17.973 22.1999C18.6066 22.1999 19.2142 21.9411 19.6622 21.4803C20.1102 21.0194 20.3619 20.3945 20.3619 19.7428C20.3619 19.0911 20.1102 18.4661 19.6622 18.0053C19.2142 17.5445 18.6066 17.2856 17.973 17.2856C17.3394 17.2856 16.7318 17.5445 16.2838 18.0053C15.8358 18.4661 15.5841 19.0911 15.5841 19.7428Z"
                                 stroke="#272727"
                                 stroke-width="1.4"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                              />
                              <path
                                 d="M3.63889 19.7429H1.25V6.22857C1.25 5.90274 1.37584 5.59024 1.59984 5.35984C1.82385 5.12944 2.12766 5 2.44445 5H13.1945V19.7429M8.41667 19.7429H15.5833M20.3611 19.7429H22.75V12.3714M22.75 12.3714H13.1945M22.75 12.3714L19.1667 6.22857H13.1945"
                                 stroke="#272727"
                                 stroke-width="1.4"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                              />
                           </svg>
                           <span>Доставка кур`єром Smartbuy</span>
                        </div>
                        <div>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none">
                              <path
                                 d="M15.5995 11L11.1998 15.3996L9 13.1998"
                                 stroke="#272727"
                                 stroke-width="1.3"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                              />
                              <path
                                 d="M20 6.5L12 3L4 6.5V13.5C4 17.1 5 18.5 8 20.5L12 23L16 20.5C20 17.5 20 16 20 13.5V6.5Z"
                                 stroke="#272727"
                                 stroke-width="1.5"
                                 stroke-linejoin="round"
                              />
                           </svg>
                           <span>Гарантія. 36 місяців обмін/повернення товару впродовж 14 днів</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={styles.commBlock}>
                  <h3 className={styles.commHeader}>Відгуки:</h3>
                  <div className={styles.comment}>
                     <div className={styles.commTop}>
                        <div className={styles.profileImage}>
                           <Image src={profileImg} alt="logo image" fill />
                        </div>
                        <div className={styles.profileInfo}>
                           <div className={styles.commInfo}>
                              <h4 className={styles.commHeader}>Ірина Гончарук</h4>
                              <span className={styles.reviews}>2 год</span>
                           </div>
                           <div>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="108"
                                 height="20"
                                 viewBox="0 0 108 20"
                                 fill="none">
                                 <path
                                    d="M9.6924 0L11.8685 6.90983H18.9104L13.2134 11.1803L15.3894 18.0902L9.6924 13.8197L3.99535 18.0902L6.17143 11.1803L0.47438 6.90983H7.51632L9.6924 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M31.751 0L33.9271 6.90983H40.969L35.272 11.1803L37.448 18.0902L31.751 13.8197L26.0539 18.0902L28.23 11.1803L22.533 6.90983H29.5749L31.751 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M31.751 0L33.9271 6.90983H40.969L35.272 11.1803L37.448 18.0902L31.751 13.8197L26.0539 18.0902L28.23 11.1803L22.533 6.90983H29.5749L31.751 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M53.8096 0L55.9857 6.90983H63.0276L57.3306 11.1803L59.5066 18.0902L53.8096 13.8197L48.1125 18.0902L50.2886 11.1803L44.5916 6.90983H51.6335L53.8096 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M75.8682 0L78.0443 6.90983H85.0862L79.3891 11.1803L81.5652 18.0902L75.8682 13.8197L70.1711 18.0902L72.3472 11.1803L66.6502 6.90983H73.6921L75.8682 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M97.9268 0L100.103 6.90983H107.145L101.448 11.1803L103.624 18.0902L97.9268 13.8197L92.2297 18.0902L94.4058 11.1803L88.7088 6.90983H95.7507L97.9268 0Z"
                                    fill="#FED766"
                                 />
                              </svg>
                           </div>
                        </div>
                        <div className={styles.reaction}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none">
                              <path
                                 d="M5 9V21H1V9H5ZM9 21C8.46957 21 7.96086 20.7893 7.58579 20.4142C7.21071 20.0391 7 19.5304 7 19V9C7 8.45 7.22 7.95 7.59 7.59L14.17 1L15.23 2.06C15.5 2.33 15.67 2.7 15.67 3.11L15.64 3.43L14.69 8H21C22.11 8 23 8.9 23 10V12C23 12.26 22.95 12.5 22.86 12.73L19.84 19.78C19.54 20.5 18.83 21 18 21H9ZM9 19H18.03L21 12V10H12.21L13.34 4.68L9 9.03V19Z"
                                 fill="#777777"
                              />
                           </svg>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none">
                              <path
                                 d="M19 15V3H23V15H19ZM15 3C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V15C17 15.55 16.78 16.05 16.41 16.41L9.83 23L8.77 21.94C8.5 21.67 8.33 21.3 8.33 20.88L8.36 20.57L9.31 16H3C1.89 16 1 15.1 1 14V12C1 11.74 1.05 11.5 1.14 11.27L4.16 4.22C4.46 3.5 5.17 3 6 3H15ZM15 5H5.97L3 12V14H11.78L10.65 19.32L15 14.97V5Z"
                                 fill="#777777"
                              />
                           </svg>
                        </div>
                     </div>
                     <div className={styles.commText}>
                        <p className={helveticaLight.className}>
                           Отримала монітор сьогодні. Ефект гостингу присутній, але до цього була готова, читала про
                           переваги та недоліки VA матриці. Дуже сподобалося те, як відображає зображення монітор із
                           зігнутим екраном; плюс 165 Гц - дуже чудово. Сам монітор виглядає акуратно і стильно. Ціна
                           також помірна.
                        </p>
                     </div>
                  </div>
                  <div className={styles.comment}>
                     <div className={styles.commTop}>
                        <div className={styles.profileImage}>
                           <Image src={profileImg} alt="logo image" fill />
                        </div>
                        <div className={styles.profileInfo}>
                           <div className={styles.commInfo}>
                              <h4 className={styles.commHeader}>Віталій Міщук</h4>
                              <span className={styles.reviews}>2 год</span>
                           </div>
                           <div>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="108"
                                 height="20"
                                 viewBox="0 0 108 20"
                                 fill="none">
                                 <path
                                    d="M9.6924 0L11.8685 6.90983H18.9104L13.2134 11.1803L15.3894 18.0902L9.6924 13.8197L3.99535 18.0902L6.17143 11.1803L0.47438 6.90983H7.51632L9.6924 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M31.751 0L33.9271 6.90983H40.969L35.272 11.1803L37.448 18.0902L31.751 13.8197L26.0539 18.0902L28.23 11.1803L22.533 6.90983H29.5749L31.751 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M31.751 0L33.9271 6.90983H40.969L35.272 11.1803L37.448 18.0902L31.751 13.8197L26.0539 18.0902L28.23 11.1803L22.533 6.90983H29.5749L31.751 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M53.8096 0L55.9857 6.90983H63.0276L57.3306 11.1803L59.5066 18.0902L53.8096 13.8197L48.1125 18.0902L50.2886 11.1803L44.5916 6.90983H51.6335L53.8096 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M75.8682 0L78.0443 6.90983H85.0862L79.3891 11.1803L81.5652 18.0902L75.8682 13.8197L70.1711 18.0902L72.3472 11.1803L66.6502 6.90983H73.6921L75.8682 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M97.9268 0L100.103 6.90983H107.145L101.448 11.1803L103.624 18.0902L97.9268 13.8197L92.2297 18.0902L94.4058 11.1803L88.7088 6.90983H95.7507L97.9268 0Z"
                                    fill="#FED766"
                                 />
                              </svg>
                           </div>
                        </div>
                        <div className={styles.reaction}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none">
                              <path
                                 d="M5 9V21H1V9H5ZM9 21C8.46957 21 7.96086 20.7893 7.58579 20.4142C7.21071 20.0391 7 19.5304 7 19V9C7 8.45 7.22 7.95 7.59 7.59L14.17 1L15.23 2.06C15.5 2.33 15.67 2.7 15.67 3.11L15.64 3.43L14.69 8H21C22.11 8 23 8.9 23 10V12C23 12.26 22.95 12.5 22.86 12.73L19.84 19.78C19.54 20.5 18.83 21 18 21H9ZM9 19H18.03L21 12V10H12.21L13.34 4.68L9 9.03V19Z"
                                 fill="#777777"
                              />
                           </svg>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none">
                              <path
                                 d="M19 15V3H23V15H19ZM15 3C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V15C17 15.55 16.78 16.05 16.41 16.41L9.83 23L8.77 21.94C8.5 21.67 8.33 21.3 8.33 20.88L8.36 20.57L9.31 16H3C1.89 16 1 15.1 1 14V12C1 11.74 1.05 11.5 1.14 11.27L4.16 4.22C4.46 3.5 5.17 3 6 3H15ZM15 5H5.97L3 12V14H11.78L10.65 19.32L15 14.97V5Z"
                                 fill="#777777"
                              />
                           </svg>
                        </div>
                     </div>
                     <div className={styles.commText}>
                        <p className={helveticaLight.className}>
                           Не великий та компактний, практично відсутні рамки, 165 герц та швидкий відгук. Доволі
                           непоганий звук з монтованих динаміків
                        </p>
                     </div>
                  </div>
                  <div className={styles.comment}>
                     <div className={styles.commTop}>
                        <div className={styles.profileImage}>
                           <Image src={profileImg} alt="logo image" fill />
                        </div>
                        <div className={styles.profileInfo}>
                           <div className={styles.commInfo}>
                              <h4 className={styles.commHeader}>Яків Онищук</h4>
                              <span className={styles.reviews}>2 год</span>
                           </div>
                           <div>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="108"
                                 height="20"
                                 viewBox="0 0 108 20"
                                 fill="none">
                                 <path
                                    d="M9.6924 0L11.8685 6.90983H18.9104L13.2134 11.1803L15.3894 18.0902L9.6924 13.8197L3.99535 18.0902L6.17143 11.1803L0.47438 6.90983H7.51632L9.6924 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M31.751 0L33.9271 6.90983H40.969L35.272 11.1803L37.448 18.0902L31.751 13.8197L26.0539 18.0902L28.23 11.1803L22.533 6.90983H29.5749L31.751 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M31.751 0L33.9271 6.90983H40.969L35.272 11.1803L37.448 18.0902L31.751 13.8197L26.0539 18.0902L28.23 11.1803L22.533 6.90983H29.5749L31.751 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M53.8096 0L55.9857 6.90983H63.0276L57.3306 11.1803L59.5066 18.0902L53.8096 13.8197L48.1125 18.0902L50.2886 11.1803L44.5916 6.90983H51.6335L53.8096 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M75.8682 0L78.0443 6.90983H85.0862L79.3891 11.1803L81.5652 18.0902L75.8682 13.8197L70.1711 18.0902L72.3472 11.1803L66.6502 6.90983H73.6921L75.8682 0Z"
                                    fill="#FED766"
                                 />
                                 <path
                                    d="M97.9268 0L100.103 6.90983H107.145L101.448 11.1803L103.624 18.0902L97.9268 13.8197L92.2297 18.0902L94.4058 11.1803L88.7088 6.90983H95.7507L97.9268 0Z"
                                    fill="#FED766"
                                 />
                              </svg>
                           </div>
                        </div>
                        <div className={styles.reaction}>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none">
                              <path
                                 d="M5 9V21H1V9H5ZM9 21C8.46957 21 7.96086 20.7893 7.58579 20.4142C7.21071 20.0391 7 19.5304 7 19V9C7 8.45 7.22 7.95 7.59 7.59L14.17 1L15.23 2.06C15.5 2.33 15.67 2.7 15.67 3.11L15.64 3.43L14.69 8H21C22.11 8 23 8.9 23 10V12C23 12.26 22.95 12.5 22.86 12.73L19.84 19.78C19.54 20.5 18.83 21 18 21H9ZM9 19H18.03L21 12V10H12.21L13.34 4.68L9 9.03V19Z"
                                 fill="#777777"
                              />
                           </svg>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none">
                              <path
                                 d="M19 15V3H23V15H19ZM15 3C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V15C17 15.55 16.78 16.05 16.41 16.41L9.83 23L8.77 21.94C8.5 21.67 8.33 21.3 8.33 20.88L8.36 20.57L9.31 16H3C1.89 16 1 15.1 1 14V12C1 11.74 1.05 11.5 1.14 11.27L4.16 4.22C4.46 3.5 5.17 3 6 3H15ZM15 5H5.97L3 12V14H11.78L10.65 19.32L15 14.97V5Z"
                                 fill="#777777"
                              />
                           </svg>
                        </div>
                     </div>
                     <div className={styles.commText}>
                        <p className={helveticaLight.className}>
                           Хороший монітор за таку ціну раніше був BenQ 50 гц за 6 тисяч зараз в 165 гц набагато краще
                        </p>
                     </div>
                  </div>
               </div>
            </section>
         </div>
         <div className={styles.products}>
            <ProductGallery maxCount={6} tittle="Схожі товари" products={promotedProducts} />
         </div>
      </div>
   );
}

import localFont from "next/font/local";

const helveticaRoman = localFont({
   src: [
      {
         path: "../../public/fonts/HelveticaNeueCyr-Black/HelveticaNeueCyr-Roman.otf",
         style: "normal",
      },
    
   ],
});
const helveticaMedium = localFont({
   src: [
      {
         path: "../../public/fonts/HelveticaNeueCyr-Black/HelveticaNeueCyr-Medium.otf",
         style: "normal",
      },
    
   ],
   variable:"--helvetica-medium"
});

const helveticaLight = localFont({
   src: [
      {
         path: "../../public/fonts/HelveticaNeueCyr-Black/HelveticaNeueCyr-Light.otf",
         style: "normal",
      },
    
   ],
});
const sfPro = localFont({
    src: [
       {
          path: "../../public/fonts/SF-Pro-Display/SF-Pro-Display-Black.otf",
          style: "normal",
       },
    ],
 });

 export {helveticaRoman,helveticaMedium,helveticaLight,sfPro}
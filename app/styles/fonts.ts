import localFont from "next/font/local";

const helveticaRoman = localFont({
   src: [
      {
         path: "../../public/fonts/HelveticaNeueCyr-Black/HelveticaNeueCyr-Roman.otf",
         style: "normal",
      },
   ],
   variable: "--helvetica-roman",
});
const helveticaMedium = localFont({
   src: [
      {
         path: "../../public/fonts/HelveticaNeueCyr-Black/HelveticaNeueCyr-Medium.otf",
         style: "normal",
      },
   ],
   variable: "--helvetica-medium",
});

const helveticaLight = localFont({
   src: [
      {
         path: "../../public/fonts/HelveticaNeueCyr-Black/HelveticaNeueCyr-Light.otf",
         style: "normal",
      },
   ],
});
const sfProLight = localFont({
   src: [
      {
         path: "../../public/fonts/SF-Pro-Display/SF-Pro-Display-Light.otf",
         style: "normal",
      },
   ],
});

export { helveticaRoman, helveticaMedium, helveticaLight, sfProLight };

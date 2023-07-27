"use client";



export default function Error({ error, reset }: { error: Error; reset: () => void }) {
   return (
      <div>
         <h3>За заданими параметрами не знайдено жодної моделі</h3>
      </div>
   );
}

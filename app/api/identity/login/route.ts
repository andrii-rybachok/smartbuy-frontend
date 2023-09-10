
export async function POST(request: Request) {
   const data = await request.json();
   const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/shop/authenticate", {
      credentials: "include",
      method: "POST",
      cache: "no-cache",
      headers: {
         "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
   });

   let response = await res.text();
   return new Response(response, {
      status: res.status,
      headers: res.headers,
   });
}

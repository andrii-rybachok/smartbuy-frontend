export async function POST(request: Request) {
    const data = await request.json();
    const res = await fetch("http://127.0.0.1:7196/api/shop/register", {
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
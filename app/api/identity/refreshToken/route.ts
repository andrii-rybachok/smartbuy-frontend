import { NextRequest } from "next/server";


export async function POST(request:NextRequest){
    const token = request.cookies.get('refreshToken');
    const res =await fetch("http://127.0.0.1:7196/api/shop/refresh-token",{
        credentials:"include",
        method:"POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Cookie":"refreshToken="+token?.value+";"
        },
    });

   


    return new Response(res.body,{
        status:res.status,
        headers:res.headers
    });
}
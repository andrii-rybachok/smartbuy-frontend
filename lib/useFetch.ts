import { useEffect, useState } from "react";
import { UnAuthorizedError } from "./exceptions";
import { logout } from "@/app/components/logout";
import { useRouter } from "next/navigation";

export async function getNewToken() {
  const res = await fetch("http://localhost:3000/api/identity/refreshToken", {
    credentials: "include",
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response:any)=>{
    if (!response.ok) {
      if (response.detail === "Invalid token") {
        logout();
        return response;
      }
    }
    return response;
  }).catch((reeason:any)=>{
    throw new Error(reeason.message);
  });

  const response = await res.json();
  // if (!res.ok) {
  //   if (response.detail === "Invalid token") {
  //     logout();
  //     return response;
  //   }
  // }
  return response;
}

export default function useFetch(url: string, options: any) {
  const [data, setData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const data = await (
          await fetch(url, {
            ...options,
            headers:{
              'Authorization': "Bearer "+ localStorage.getItem("acces-token"),
          "Content-Type": "application/json",
            }
          }).then((response: any) => {


              switch (response.status) {
                case 500: console.error('Some server error'); break;
                case 401: console.log("123"); throw new UnAuthorizedError("401 error");
              }

              if (response.ok) {
                return response;
              } else {
                
                throw Error(response.statusText);
              }
          })
        ).json();
        setData(data);
      } catch (error) {
        const response = await getNewToken();
        if (response.detail = "Invalid token" &&response.jwtToken==undefined) {
          router.replace("/identity/login");
        }
        else{
          localStorage.setItem("acces-token",response.jwtToken);
          dataFetch();
        }
      }
    };

    dataFetch();
  }, [url]);

  return data;
}

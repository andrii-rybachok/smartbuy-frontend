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
  });

  const response = await res.json();
  if (!res.ok) {
    if (response.detail === "Invalid token") {
      logout();
      return response;
    }
  }
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
            if (response.status === 401) {
              throw new UnAuthorizedError("401 error");
            }
            return response;
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

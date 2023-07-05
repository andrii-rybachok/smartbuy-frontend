import { cookies } from "next/dist/client/components/headers";



export async function IsAuthorized(){

  return cookies().has("refreshToken");
}


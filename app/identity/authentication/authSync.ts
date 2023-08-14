import { cookies } from "next/dist/client/components/headers";

export async function IsAuthorized() {
    if(cookies().has("refreshToken")){
      return cookies().get("refreshToken") !=undefined;
    }
    return false;
}

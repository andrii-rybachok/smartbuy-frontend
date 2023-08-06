"use client";
import { ReactNode, createContext, useState } from "react";

export const AuthorizationContext = createContext(false);

export default function AuthorizationProvider({
   children,
   isAuthorized,
}: {
   children: any;
   isAuthorized: boolean;
}) {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthorized);
   return <AuthorizationContext.Provider value={isLoggedIn}>{children}</AuthorizationContext.Provider>;
}

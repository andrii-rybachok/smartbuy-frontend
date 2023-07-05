'use client'

import useFetch from "@/lib/useFetch"

export default function GetAllUsers(){

    let  options = {
        method:"GET",

        headers: {
        'Authorization': "Bearer "+ localStorage.getItem("acces-token"),
          "Content-Type": "application/json",
      },
    };
    const users = useFetch("http://127.0.0.1:7196/api/shop",options);
    async function getAllUsers(){
        console.log(users);
    }
    return(
    <button onClick={getAllUsers}>
        Show all users
    </button>
    );
}
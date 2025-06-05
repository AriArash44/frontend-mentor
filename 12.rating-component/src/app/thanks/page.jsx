import { useSearchParams } from "next/navigation";

//this page retrieving mechanism must become ssr using serversideprops
//the home page instead is csr using "use client";
//or maybe we must call the api serverside here 

export default function Thanks(){
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    return(
      <h1>{ message }</h1>
    )
}
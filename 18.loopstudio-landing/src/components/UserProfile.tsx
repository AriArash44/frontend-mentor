"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AuthButton } from "./AuthButton";

interface userData {
    userImage: string,
    userName: string,
    action: string,
}

export default function UserProfile() {
    const [data, setData] = useState<userData | null>(null);
    useEffect(() => {
        fetch("/api/get-profile-data", { credentials: "include" })
            .then(res => res.json())
            .then(setData);
    }, []);
    if(data){
      return (
        <div>
          <Image src={data.userImage} alt="user" width={100} height={100} />
          <p>{data.userName}</p>
          <AuthButton action={data.action} />
        </div>
      );
    }
}
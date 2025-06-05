"use client";

import RateButtons from "@/components/molecules/RateButtons";
import Image from "next/image";
import { useState } from "react";
import { showToast } from "../utils/showToastHandler";
import { serverPost } from "@/utils/serverPost";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const handleRateChange = (newRating) => {
        setRating(newRating);
    };
    const postRate = async () => {
        try {
            const res = await serverPost("/rate", {"rate": rating});
            router.push(`/thanks/?message=${res.message}`);
        } catch(e) {
            console.log(e)
            showToast(e.message || "an error occured");
        } 
    }
    return (
      <>
        <header>
          <h1 className="sr-only hidden">rating app component</h1>
        </header>
        <main className="rounded-2xl bg-gray-900 p-6 w-[325px] sm:w-[375px]">
          <div className="bg-gray-500 rounded-full p-3 w-12 h-12 bg-opacity-5">
            <Image width={20} height={20} src="/images/icon-star.svg" alt="star Icon"/>
          </div>
          <section>
            <h2 className="font-bold mt-5">How did we do?</h2>
            <p className="font-sm text-gray-500 my-2">Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
            <RateButtons onRateChange={handleRateChange}/>
          </section>
          <button className="bg-orange-500 rounded-full py-2 w-full mt-5 text-gray-950 hover:bg-whites cursor-pointer" 
          onClick={async() => { await postRate() }} type="submit">SUBMIT</button>
        </main>
      </>
    );
}

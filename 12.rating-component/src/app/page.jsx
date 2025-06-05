"use client";

import RateButtons from "@/components/molecules/RateButtons";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const handleRateChange = (newRating) => {
        setRating(newRating);
    };
    return (
      <>
        <div className="bg-grey-500 rounded-full p-3 w-12 h-12 bg-opacity-5">
          <Image width={20} height={20} src="/images/icon-star.svg" alt="star Icon"/>
        </div>
        <section>
          <h1 className="font-bold mt-5">How did we do?</h1>
          <p className="font-sm text-gray-500 my-2">Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
          <RateButtons onRateChange={handleRateChange}/>
        </section>
        <button className="bg-orange-500 rounded-full py-2 w-full mt-5 text-gray-950 hover:bg-whites cursor-pointer" 
        onClick={() => { 
            router.push(`/thanks?rate=${rating}`);
        }} type="submit">SUBMIT</button>     
      </>
    );
}

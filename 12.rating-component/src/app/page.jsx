"use client";

import RateButtons from "@/components/molecules/RateButtons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function Home() {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const handleRateChange = (newRating) => {
        setRating(newRating);
    };
    const navigateToThank = () => {
        if(rating) {
            router.push(`/thanks?rate=${rating}`);
        }
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch(e.key) {
                case "Enter":
                    navigateToThank();
                    break;
                case "ArrowLeft":
                    handleRateChange(rating > 1 ? rating - 1 : 1);
                    break;
                case "ArrowRight":
                    handleRateChange(rating < 5 ? rating + 1 : 5);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [rating]);
    return (
      <>
        <div className="bg-grey-500/10 rounded-full p-3 w-12 h-12 bg-opacity-5 flex justify-center items-center">
          <Image width={20} height={20} src="/images/icon-star.svg" alt="star Icon"/>
        </div>
        <section>
          <h1 className="font-bold mt-8">How did we do?</h1>
          <p className="text-sm text-grey-200 leading-relaxed mt-2 mb-5">Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
          <RateButtons rating={rating} onRateChange={handleRateChange}/>
        </section>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className={"bg-orange-500 rounded-full py-2 w-full mt-8 text-gray-950 font-bold ".concat(
            rating ? "hover:bg-white cursor-pointer " : "cursor-not-allowed opacity-75"
        )} 
        onClick={navigateToThank} type="submit">SUBMIT</motion.button>
      </>
    );
}
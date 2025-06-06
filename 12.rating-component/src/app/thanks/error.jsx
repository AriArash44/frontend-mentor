"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

export default function Error({ error, reset }) {
    const handleReset = () => {
        reset();
        window.location.reload();
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                handleReset();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
    return (
      <div>
        <h1>Something went wrong!</h1>
        <p className="mt-4 text-grey-500">the occured error is: {error.message}</p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
         className="bg-orange-500 w-full hover:bg-white hover:text-grey-950 
        rounded-full mt-6 py-1 cursor-pointer" onClick={handleReset} type="reset">Try again</motion.button>
      </div>
    );
}
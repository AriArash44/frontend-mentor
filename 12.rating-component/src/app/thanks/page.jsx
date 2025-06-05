import { serverPost } from "@/utils/serverPost";
import Image from "next/image";

export default async function Thanks({ searchParams }) {
    const params = await searchParams;
    const rate = params.rate;
    const res = await serverPost("/rate", { cache: 'no-store' }, {"rate": rate});
    let randNum = Math.random();
    if(randNum > 0.5) {
        throw new Error("sample random error just for test");
    }
    return(
      <div className="flex flex-col items-center">
        <Image width={120} height={80} src="/images/illustration-thank-you.svg" alt="thank you icon"/>
        <h2 className="text-orange-500 px-4 py-2 rounded-4xl bg-gray-500 mt-4">{ res.message }</h2>
        <h1 className="mt-8 font-bold">Thank You!</h1>
        <p className="mt-6 text-grey-500">We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
      </div>
    )
}
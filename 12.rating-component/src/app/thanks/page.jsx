import { serverPost } from "@/utils/serverPost";
import Image from "next/image";

export default async function Thanks({ searchParams }) {
    const params = await searchParams;
    const rate = params.rate;
    const res = await serverPost("/rate", { cache: 'no-store' }, {"rate": rate});
    let randNum = Math.random();
    if (randNum > 0.9) {
        throw new Error("sample random error just for test");
    }
    return(
      <div className="flex flex-col items-center">
        <Image className="mt-2" width={120} height={80} src="/images/illustration-thank-you.svg" role="presentation" alt="thank you icon"/>
        <p className="text-orange-500 px-6 py-1 rounded-4xl bg-gray-500/25 mt-8 text-sm">{ res.message }</p>
        <h1 className="mt-10 font-bold">Thank You!</h1>
        <p className="mt-3 text-grey-200 text-sm text-center">We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
      </div>
    )
}
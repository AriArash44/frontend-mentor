import { serverPost } from "@/utils/serverPost";

export default async function Thanks({ searchParams }) {
    const params = await searchParams;
    const rate = params.rate;
    const res = await serverPost("/rate", { cache: 'no-store' }, {"rate": rate});
    return(
      <h1>{ res.message }</h1>
    )
}
import Image from "next/image";
import { doAction } from "../lib/doAction";

export default async function UserProfile() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-profile-data`, {
        cache: "no-store"
    });
    const data = await res.json();
    return (
      <div>
        <Image src={data.userImage} alt="user" width={100} height={100} />
        <p>{data.userName}</p>
        <form action={async () => {
            "use server";
            await doAction(data.action);
        }}>
          <button type="submit">{data.action}</button>
        </form>
      </div>
    );
}
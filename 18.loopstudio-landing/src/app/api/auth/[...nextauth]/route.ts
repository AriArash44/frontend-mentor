import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/src/lib/mongodb";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { ObjectId } from "mongodb";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    session: {
        strategy: "database",
    },
    events: {
        async signIn({ user }) {
            const client = await clientPromise;
            const db = client.db("proj-18");
            await db.collection("sessions").deleteMany({});
        },
    }
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/db/client";
// import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
            
      return {...session,user:{...session.user, id: token.sub || '1'}}
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _) {
          const username = credentials?.username;
          const password = credentials?.password;
          
          console.log(username, password);
        if (!username || !password) throw new Error("username/password missing!");
        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
            password: credentials.password,
          },
        });
        if (user) {
          return { id: user.id, username: user.username };
        }
        throw new Error("username/password do not match!");

     
      },
    }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    // ...add more providers here
  ],
  pages: { signIn: "/auth/signin" },
};

export default NextAuth(authOptions);

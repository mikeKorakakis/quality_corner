import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ldap from "ldapjs";
import { Client } from "ldapts";
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

      return { ...session, user: { ...session.user, id: token.sub || "1" } };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    
    CredentialsProvider({
      name: "LDAP",
      credentials: {
        username: { label: "DN", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You might want to pull this call out so we're not making a new LDAP client on every login attemp
        const username = credentials?.username;
        const password = credentials?.password;
        if (username?.includes("@")) {
          const request = await fetch(`${process.env.NEXTAUTH_URL}/api/read_folders`);
          const folders = await request.json();
          const availableGroups:string[] = folders.reduce(( init: string[], folder: string,) => {
            return [...init, folder.toLowerCase() + "_view", folder.toLowerCase() + "_admin"];
            },[]);

          if (!username || !password)
            throw new Error("username/password missing!");
          const client = new Client({
            url: `ldap://${username.split("@")[1]}`,
          });

         
          try {
            await client.bind(credentials.username, credentials.password);
          } catch (e) {
            return Promise.reject();
          }
          // find the user groups in LDAP
          const res = await client.search("DC=day,DC=haf,DC=gr", {
            filter: "(sAMAccountName=user)",
            scope: "sub",
            attributes: ["dn", "sn", "cn", "mail", "memberOf"],
          });
          const user = res.searchEntries[0];
          const groups =
            user &&
            (user.memberOf as string[])?.map((group) => {
              const groupname = group && group.split(",")[0]?.split("=")[1];
              return groupname || "";
            });
          const intesect = groups && groups?.filter((group) =>
            availableGroups.includes(group)
            );

            if(intesect?.length === 0) {
                return Promise.reject();
            }


          await client.unbind();
          return {
            id: credentials.username,
            name: credentials.username,
            // groups: intesect,
          };
        } else {
          const username = credentials?.username;
          const password = credentials?.password;

          if (!username || !password)
            throw new Error("username/password missing!");
          const user = await prisma.user.findFirst({
            where: {
              username: credentials.username,
              password: credentials.password,
            },
          });
          return new Promise((resolve, reject) => {
            if (user) {
              return resolve({
                id: user.id,
                name: user.username,
              });
            }
            reject();
          });
        }
      },
    }),
  ],
  pages: { signIn: "/auth/signin" },
};

export default NextAuth(authOptions);

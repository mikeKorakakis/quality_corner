import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
    async session({ session, token}){//, user }) {
      const role: string = token.role as string;
      const groups: string[] = token.groups as string[];

      return {
        ...session,
        user: { ...session.user, groups, role, id: token.sub || "1" },
      };
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        // User object only passed on initial JWT creation
        console.log(user);
        console.log(token);
        console.log(account);
        console.log(profile);
        console.log(isNewUser);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const groups = user.groups;
        token.groups = groups;
        if (
          (user.name?.includes("@day.haf.gr") &&
            groups.includes("Domain Admins")) ||
          user.name === "admin"
        ) {
          token.role = "admin";
        } else if (user.name === "moderator") {
          token.role = "moderator";
        } else {
          token.role = "user";
        }
      }
      console.log(token.role);
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  //   callbacks: {
  //     async jwt(token, user, account, profile, isNewUser) {
  //      if (user) { // User object only passed on initial JWT creation
  //        const administrators = [ 'jsmith@example.com' ]
  //        token.isAdmin = administrators.includes(user?.email)
  //      }
  //      return token
  //    }
  //  },
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
          const request = await fetch(
            `${process.env.NEXTAUTH_URL}/api/read_folders`
          );
          const folders = await request.json();
          const availableGroups: string[] = folders.reduce(
            (init: string[], folder: string) => {
              return [
                ...init,
                folder.toLowerCase() + "_view",
                folder.toLowerCase() + "_admin",
              ];
            },
            []
          );

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
            filter: `(sAMAccountName=${username.split("@")[0]})`,
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
          const intesect =
            groups &&
            groups?.filter(
              (group) =>
                availableGroups.includes(group) || group === "Domain Admins"
            );

          if (intesect?.length === 0) {
            return Promise.reject();
          }

          await client.unbind();
          return {
            id: credentials.username,
            name: credentials.username,
            groups: intesect,
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

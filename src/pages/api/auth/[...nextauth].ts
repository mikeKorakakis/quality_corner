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
    async session({ session, token }) {
      //, user }) {
      const role: string = token.role as string;
      const groups: string[] = token.groups as string[];

      return {
        ...session,
        user: { ...session.user, groups, role, id: token.sub || "1" },
      };
    },
    async jwt({ token, user }) {
      //, account, profile, isNewUser }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const groups = user.groups;
        token.groups = groups;
        // console.log(groups.some((group) => group === "domain admins"));

        if (
          (user.name?.includes("@day.haf.gr") &&
            groups.includes("domain admins")) ||
          user.name === "admin"
        ) {
          token.role = "admin";
        } else if (
          user.name === "moderator" ||
          (user.name?.includes("@day.haf.gr") &&
            groups.some((group: string) => group.includes("_admin")))
        ) {
          token.role = "moderator";
        } else {
          token.role = "user";
        }
      }
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
  //      return token  //    }  //  },
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
                folder.toLowerCase().replace("public/library/", "") + "_view",
                folder.toLowerCase().replace("public/library/", "") + "_admin",
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
            console.log(e);
            return Promise.reject();
          }

          let searchUri = "";
          const splitUri = username.split("@")[1]?.split(".");
          if (splitUri && splitUri.length > 0) {
            for (const id of splitUri) {
              searchUri = searchUri + `DC=${id},`;
            }
          }
          searchUri = searchUri.substring(0, searchUri.length - 1);

          const res = await client.search(searchUri, {
            filter: `(sAMAccountName=${username.split("@")[0]})`,
            scope: "sub",
            attributes: ["dn", "sn", "cn", "mail", "memberOf"],
          });
          const user = res.searchEntries[0];
          let groups: string[] = [];
          if (user && Array.isArray(user.memberOf)) {
            groups =
              user &&
              (user.memberOf as string[])?.map((group) => {
                const groupname =
                  group && group.split(",")[0]?.split("=")[1]?.toLowerCase();
                return groupname || "";
              });
          } else if (typeof user?.memberOf === "string") {
            let group =
              user?.memberOf && user?.memberOf?.split(",")[0]?.split("=")[1];
            group = group && group.toLowerCase();
            groups = group ? [group] : [""];
          }
          console.log(groups);
          const intesect =
            groups &&
            groups?.filter(
              (group) =>
                availableGroups.includes(group) || group === "domain admins"
            );

          console.log(availableGroups, groups, intesect);

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

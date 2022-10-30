import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { APP_NAME } from "../../../config";
import Layout from "./Layout";
import LoadingPage from "./LoadingPage";

interface Props {
  children: ReactNode;
  title?: string;
  navbar?: boolean;
  auth?: boolean;
}

const Page: React.FC<Props> = ({
  children,
  title = "",
  navbar = true,
  auth = true,
}) => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (auth && !sessionData && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [status, auth, sessionData, router]);

  if (status === "loading") return null; // <LoadingPage page={true}/>;
  return (
    <div className="h-full bg-gray-50">
      <Head>
        <title>{`${title} | ${APP_NAME}`}</title>
      </Head>
      {/* <input type="checkbox" id="my-modal" className="modal-toggle" /> */}
      {navbar ? (
        <Layout>{children}</Layout>
      ) : (
        <div className="h-full">{children}</div>
      )}
    </div>
  );
};

Page.displayName = "Page";

export default Page;

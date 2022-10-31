import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { APP_NAME } from "../../../config";
import Layout from "./Layout";
import LoadingPage from "./LoadingPage";
import ModalContainer from "./Modal/ModalContainer";

interface Props {
  children: ReactNode;
  title?: string;
  navbar?: boolean;
  auth?: boolean;
}

const Page = ({ children, title = "", navbar = true, auth = true }: Props) => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (auth && !sessionData && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [status, auth, sessionData, router]);

  if (status === "loading") return <LoadingPage page={true} />;
  return (
    <div className="h-full bg-gray-50">
      <Head>
        <title>{`${title} | ${APP_NAME}`}</title>
      </Head>
      <ModalContainer id="my-modal-46"  />
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

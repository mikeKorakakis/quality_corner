import Head from "next/head";
import { ReactNode } from "react";
import { APP_NAME } from "@/config";
import Layout from "./Layout/Index";
import ModalContainer from "./Modal/ModalContainer";

interface Props {
  children: ReactNode;
  title?: string;
  navbar?: boolean;
  auth?: boolean;
}

const Page = ({ children, title = "", navbar = true }: Props) => {

  return (
    <div className="h-full bg-base-300">
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

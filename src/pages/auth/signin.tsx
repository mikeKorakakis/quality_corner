import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Page from "@/core/components/Layout/Page";
import Login from "@/features/Login";

const SigninPage: NextPage = () => {
  return (
    <Page title="Login" auth={false} navbar={false}>
      <Login />
    </Page>
  );
};

export default SigninPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

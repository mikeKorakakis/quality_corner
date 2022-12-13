import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Page from "@/core/components/Layout/Page";
import Login from "@/features/Login";
import { useEffect } from 'react';
import { useRouter } from "next/router";
import LoadingPage from './../../core/components/Layout/LoadingPage';

const SigninPage: NextPage = () => {
    const router = useRouter()
    const { status } = useSession()

  if (status === "loading") {
    return <LoadingPage page={true}/>
  }

  if (status === "authenticated") {
    router.push("/")
  }


  return (
    <Page title="Login" auth={false} navbar={false}>
      <Login />
    </Page>
  );
};

export default SigninPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };

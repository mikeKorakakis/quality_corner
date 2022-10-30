import { NextPage } from "next";
import Page from "../../core/components/Layout/Page";
import Login from "../../features/Login";

const SigninPage:NextPage = () => {
    return ( 
        <Page title="Login" auth={false} navbar={false}>
            <Login />
        </Page>
     );
}
 
export default SigninPage;
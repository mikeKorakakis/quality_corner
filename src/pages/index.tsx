import Page from "../core/components/Layout/Page";
import Login from "../features/Login";

const Home = () => {
  return (
    <Page navbar={false} title="Home" auth={false}>
      <Login />
    </Page>
  );
};

export default Home;

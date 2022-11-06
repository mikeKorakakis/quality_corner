import Page from "@/core/components/Layout/Page";
import FeedEditForm from "@/features/Feed/FeedEditForm";

const Home = () => (
  <Page title="Feed">
    <FeedEditForm id={2000} />
  </Page>
);

export default Home;

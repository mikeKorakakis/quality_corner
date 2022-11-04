import Page from "../core/components/Layout/Page";
import Feed from "../features/Feed/FeedList";
import FeedEditForm from './../features/Feed/FeedEditForm';

const Home = () => {
  return (
    <Page title="Feed">
      <FeedEditForm id={2000} />
    </Page>
  );
};

export default Home;

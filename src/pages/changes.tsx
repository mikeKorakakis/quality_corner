import Page from "@/core/components/Layout/Page";
import Changes from "@/features/Changes/Changes";

export default function FeedPage() {
 
  return (
    <Page title="Φάκελοι" auth={false}>
      <Changes />
    </Page>
  );
}

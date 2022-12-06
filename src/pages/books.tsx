import Page from "@/core/components/Layout/Page";
import Books from "@/features/Books/BookList"

export default function FeedPage() {
  return (
    <Page title="Books" auth={false}>
      <Books />
    </Page>
  );
}

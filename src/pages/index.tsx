import Page from "@/core/components/Layout/Page";
import Books from "@/features/Books/BookList"

export default function HomePage() {
  return (
    <Page title="Βιβλιοθήκη" auth={false}>
      <Books />
    </Page>
  );
}

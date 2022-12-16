import Page from "@/core/components/Layout/Page";
import Books from "@/features/Books/BookList";
import { useRouter } from "next/router";

export default function LibraryPage() {
  const router = useRouter();
  // get the slug from the url as string or empty string
  const {slug: sl} = router.query
  const slug = Array.isArray(sl) ?  sl : [sl ?? ""];
  return (
    <Page title="Βιβλιοθήκη" auth={false}>
      <Books slug={slug} />
    </Page>
  );
}

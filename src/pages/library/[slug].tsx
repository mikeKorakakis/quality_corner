import Page from "@/core/components/Layout/Page";
import Books from "@/features/Books/BookList";
import { useRouter } from "next/router";

export default function FeedPage() {
    console.log("FeedPage")
  const router = useRouter();
  let folder = ""
  // get the slug from the url as string or empty string
  const { slug = ""  } = router.query;
    // if slug is an array, get the first element
    if (Array.isArray(slug)) {
        folder = slug[0] || "";
    }
    else {
        folder = slug;
    }

  return (
    <Page title="Βιβλιοθήκη" auth={false}>
      <Books folder={folder} />
    </Page>
  );
}

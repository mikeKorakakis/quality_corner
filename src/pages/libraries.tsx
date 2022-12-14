import Page from "@/core/components/Layout/Page";
import Libraries from "@/features/Libraries/LibraryList";

export default function LibraryPage() {
 
  return (
    <Page title="Φάκελοι" auth={false}>
      <Libraries />
    </Page>
  );
}

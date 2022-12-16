import Page from "@/core/components/Layout/Page";
import CleanUp from "@/features/CleanUp/CleanUp";

export default function ChangesPage() {
 
  return (
    <Page title="Εκκαθάριση" auth={false}>
      <CleanUp />
    </Page>
  );
}

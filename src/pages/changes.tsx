import Page from "@/core/components/Layout/Page";
import Changes from "@/features/Changes/Changes";

export default function ChangesPage() {
 
  return (
    <Page title="Αλλαγές" auth={false}>
      <Changes />
    </Page>
  );
}

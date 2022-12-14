import Page from "@/core/components/Layout/Page";
import SubFolders from "@/features/SubFolders/SubFolderList";

export default function SubFolderPage() {
 
  return (
    <Page title="Υποφάκελοι" auth={false}>
      <SubFolders />
    </Page>
  );
}

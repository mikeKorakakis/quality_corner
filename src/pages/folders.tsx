import Page from "@/core/components/Layout/Page";
import Folders from "@/features/Folders/FolderList";

export default function FoldersPage() {
 
  return (
    <Page title="Φάκελοι" auth={false}>
      <Folders />
    </Page>
  );
}

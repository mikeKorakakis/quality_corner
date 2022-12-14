import Page from "@/core/components/Layout/Page";
import Books from "@/features/Books/BookList";
// import { useFolderStore } from './../core/stores/folderStore';

export default function Page() {
  //   const {folders} = useFolderStore()

  return (
    <Page title="Βιβλιοθήκη" auth={false}>
      {/* <Books  folder={folders[0] || ""}/> */}
      <div className="w-full text-center">
        <h2 className="font-mono font-extrabold text-2xl">Επιλέξτε μία κατηγορία από το μενού αριστερά</h2>
      </div>
    </Page>
  );
}

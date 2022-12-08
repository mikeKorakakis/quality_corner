import Button from "@/core/components/LoadingButton";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Table from "./Table";

const columns = new Map<string, string>([
  ["index", "A/A"],
  ["title", "ΤΙΤΛΟΣ"],
  ["description", "ΠΕΡΙΓΡΑΦΗ"],
  ["category1", "ΚΑΤΗΓΟΡΙΑ"],
  ["category2", "ΥΠΟΚΑΤΗΓΟΡΙΑ"],
  ["fileUrl", "ΑΡΧΕΙΟ"],
]);
interface Props {
  folder: string;
}
const router = "book";
const getAllProcedure = "getAllInFolder";
const BookList = ({ folder }: Props) => {
  const [loading, setLoading] = useState(false);
  const utils = trpc.useContext();

  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const syncdb = async () => {
    setLoading(true);
    // Μπακαλοκώδικας για να κάνει συγχρονισμό των αρχείων (2 φορές γιατί κάνει timeout)
    await fetch(`/api/sync_db?folder=${folder}`, {
      method: "GET",
    });
    await fetch(`/api/sync_db?folder=${folder}`, {
      method: "GET",
    });
    utils[router][getAllProcedure].invalidate();
    setLoading(false);
  };
  return (
    <div className="not-prose mx-auto mt-6 mb-10 w-[100rem] overflow-x-auto">
      <div className="flex justify-between">
        {" "}
        <h1 className="ml-20 mb-5 text-3xl font-light">ΒΙΒΛΙΟΓΡΑΦΙΕΣ</h1>
        {isAuthenticated && (
          <Button
            disabled={loading}
            loading={loading}
            onClick={syncdb}
            className="btn-primary btn-md mb-4 mr-20 w-72"
          >
            ΣΥΓΧΡΟΝΙΣΜΟΣ ΑΡΧΕΙΩΝ
          </Button>
        )}
      </div>
      <Table
        isAuthenticated={isAuthenticated}
        columnMap={columns}
        folder={folder}
        // EditForm={BookEditForm}
      />
    </div>
  );
};

export default BookList;

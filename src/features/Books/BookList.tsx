import Button from "@/core/components/LoadingButton";
import { useSession } from "next-auth/react";
import Table from "./Table";

const columns = new Map<string, string>([
  ["index", "A/A"],
  ["title", "ΤΙΤΛΟΣ"],
  ["description", "ΠΕΡΙΓΡΑΦΗ"],
  ["category1", "ΚΑΤΗΓΟΡΙΑ 1"],
  ["category2", "ΚΑΤΗΓΟΡΙΑ 2"],
  ["fileUrl", "ΑΡΧΕΙΟ"],
]);

const BookList = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const syncdb = async () => {
    await fetch("/api/sync_db", {
        method: "GET",      
    })
    
}
  return (
    <div className="not-prose mt-6 mb-10 overflow-x-auto w-[100rem] mx-auto">
     <div className="flex justify-between"> <h1 className="text-3xl ml-20 mb-5 font-light">ΒΙΒΛΙΟΓΡΑΦΙΕΣ</h1>
      {isAuthenticated && 
        <Button onClick={syncdb} className="btn-primary btn-md w-72 mb-4 mr-20">ΣΥΓΧΡΟΝΙΣΜΟΣ ΑΡΧΕΙΩΝ</Button>
      }
      </div>
      <Table
        isAuthenticated={isAuthenticated}      
        columnMap={columns}
        folder={"test"}
        // EditForm={BookEditForm}
      />
    </div>
  );
};

export default BookList;

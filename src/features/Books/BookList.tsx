import Button from "@/core/components/LoadingButton";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Table from "./Table";
import LoadingPage from "./../../core/components/Layout/LoadingPage";
import { useRouter } from "next/router";
import { notify } from "@/utils/notify";

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
  const [allowed, setAllowed] = useState("");
  const [mod, setMod] = useState("");
  const [role, setRole] = useState("user");
  const utils = trpc.useContext();
  const r = useRouter();
  // get folder with trpc
  const { data: folderData, status: folderStatus } =
    trpc.folder.getByName.useQuery({ name: folder });

  const { data, status } = useSession();
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

  console.log("user",data?.user)

  useEffect(() => {
    const groups = data?.user?.groups || [];
    if (!(status === "loading") || !(folderStatus === "loading")) {
      if (data?.user?.role === "admin") {
        setRole("admin");
        setAllowed(folder);
      } else if (
        groups.some((group) => {
          return (
            group.split("_")[0]?.toLowerCase() === folder &&
            group.split("_")[1]?.toLowerCase() === "admin"
          );
        }) ||
        data?.user?.role === "moderator"
      ) {
        setMod(folder);
        setAllowed(folder);
      } else if (
        folderData?.private &&
        !groups.some((group) => group.split("_")[0]?.toLowerCase() === folder)
      ) {
        notify({ message: "Δεν έχετε πρόσβαση στον φάκελο", type: "error" });
        // add one second delay to allow notification to show
        setTimeout(() => {
          if (status === "authenticated") {
            r.push("/");
          } else {
            r.push("/auth/signin");
          }
        }, 2000);
      } else {
        setAllowed(folder);
      }
    }
  }, [folder, folderData, data, r, status, folderStatus, role]);
  if (
    status === "loading" ||
    folderStatus === "loading" ||
    !(
      allowed === folder ||
      mod === folder ||
      role === "admin" ||
      role === "moderator"
    )
  )
    return <LoadingPage page={true} />;
console.log('role',role)
  return (
    <div className="not-prose mx-auto mt-6 mb-10 ">
      <div className="flex justify-between">
        {" "}
        <h1 className="ml-20 mb-5 text-3xl font-light">ΒΙΒΛΙΟΓΡΑΦΙΕΣ</h1>
        {role === "admin" && (
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
      <div className="w-full overflow-x-auto">
        <Table
          role={
            role === "admin" ? "admin" :( mod === folder || role==="moderator") ? "moderator" : "user"
          }
          columnMap={columns}
          folder={folder}
          // EditForm={BookEditForm}
        />
      </div>
    </div>
  );
};

export default BookList;

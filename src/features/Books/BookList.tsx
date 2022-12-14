import Button from "@/core/components/LoadingButton";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Table from "./Table";
import LoadingPage from "./../../core/components/Layout/LoadingPage";
import { useRouter } from "next/router";
import { notify } from "@/utils/notify";
import { HOME_URL } from './../../config';

const columns = new Map<string, string>([
  ["index", "A/A"],
  ["title", "ΤΙΤΛΟΣ"],
  ["description", "ΠΕΡΙΓΡΑΦΗ"],
  ["fileUrl", "ΑΡΧΕΙΟ"],
]);
interface Props {
  slug: string[];
}
const router = "book";
const getAllProcedure = "getAllWithParams";
const BookList = ({ slug }: Props) => {
  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState("");
  const [mod, setMod] = useState("");
  const [role, setRole] = useState("user");
  const utils = trpc.useContext();
  const r = useRouter();
  // get folder with trpc
  const [lib, folder, subFolder] = slug;
  const library = lib ?? "";
  const { data: libraryData, status: libraryStatus } =
    trpc.library.getByName.useQuery({ name: library });

  const { data, status } = useSession();
  const syncdb = async () => {
    setLoading(true);
    // Μπακαλοκώδικας για να κάνει συγχρονισμό των αρχείων (2 φορές γιατί κάνει timeout)
    await fetch(`/api/sync_db?library=${library}`, {
      method: "GET",
    });
    await fetch(`/api/sync_db?library=${library}`, {
      method: "GET",
    });
    utils[router][getAllProcedure].invalidate();
    setLoading(false);
  };

  useEffect(() => {
    const groups = data?.user?.groups || [];
    if (!(status === "loading") || !(libraryStatus === "loading")) {
      if (data?.user?.role === "admin") {
        setRole("admin");
        setAllowed(library);
      } else if (
        groups.some((group) => {
          return (
            group.split("_")[0]?.toLowerCase() === library.toLowerCase() &&
            group.split("_")[1]?.toLowerCase() === "admin"
          );
        }) ||
        data?.user?.role === "moderator"
      ) {
        setMod(library);
        setAllowed(library);
      } else if (
        libraryData?.private &&
        !groups.some((group) => group.split("_")[0]?.toLowerCase() === library)
      ) {
        notify({ message: "Δεν έχετε πρόσβαση στον φάκελο", type: "error" });
        // add one second delay to allow notification to show
        setTimeout(() => {
          if (status === "authenticated") {
            r.push(HOME_URL);
          } else {
            r.push("/auth/signin");
          }
        }, 2000);
      } else {
        setAllowed(library);
      }
    }
  }, [library, libraryData, data, r, status, libraryStatus, role]);
  if (
    status === "loading" ||
    libraryStatus === "loading" ||
    !(
      allowed === library ||
      mod === library ||
      role === "admin" ||
      role === "moderator"
    )
  )
    return <LoadingPage page={true} />;
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
            role === "admin"
              ? "admin"
              : mod === library || role === "moderator"
              ? "moderator"
              : "user"
          }
          columnMap={columns}
          library={library}
          folder={folder}
          subFolder={subFolder}
          // EditForm={BookEditForm}
        />
      </div>
    </div>
  );
};

export default BookList;

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Table from "./Table";
import LoadingPage from "../../core/components/Layout/LoadingPage";
import { useRouter } from "next/router";
import { HOME_URL } from './../../config';

const columns = new Map<string, string>([
  ["index", "A/A"],
  ["name", "ΟΝΟΜΑ"],
  ["description", "ΠΕΡΙΓΡΑΦΗ"],
  ["private", "ΙΔΙΩΤΙΚΗ"],
  ["showDescription", "ΕΜΦΑΝΙΣΗ ΠΕΡΙΓΡΑΦΗΣ"],
]);

const LibraryList = () => {
  const r = useRouter();
  // get folder with trpc
  const { data, status } = useSession();

  useEffect(() => {
    if (!(status === "loading")) {
      if (!(data?.user?.role === "admin")) {
        r.push(HOME_URL);
      }
    }
  }, [data, r, status]);
  if (status === "loading") return <LoadingPage page={true} />;

  return (
    <div className="not-prose mx-auto mt-6 mb-10 ">
      <div className="flex justify-between">
        <h1 className="ml-20 mb-5 text-3xl font-light">Βιβλιοθήκες</h1>
      </div>
      <div className="w-full overflow-x-auto">
        <Table
          role="admin"
          columnMap={columns}
        />
      </div>
    </div>
  );
};

export default LibraryList;

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingPage from "../../core/components/Layout/LoadingPage";
import { useRouter } from "next/router";
import { useLibraryStore } from "@/core/stores/libraryStore";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { TableCellsIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { trpc } from "@/utils/trpc";
import type { Folder } from "@prisma/client";
import clsx from "clsx";
import { useModalStore } from "@/core/stores/modalStore";
import ModalContent from "./../../core/components/Layout/Modal/ModalContent";
import { notify } from "@/utils/notify";
import { HOME_URL } from "@/config";

const FolderChanges = () => {
  const r = useRouter();
  // get folder with trpc
  const { data, status } = useSession();
  // get folders with useFolderstore
  const state = useLibraryStore();
  const libraries = state.libraries;
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);

  const { data: folderData, isLoading: loadingFolders } =
    trpc.folder.getAllNoPagination.useQuery();

  const { data: tableData, isLoading: loadingTableData } =
    trpc.folder.getBookGroups.useQuery();

  useEffect(() => {
    if (!(status === "loading")) {
      if (!(data?.user?.role === "admin")) {
        r.push(HOME_URL);
      }
    }
  }, [data, r, status]);

  const foldersInDb = folderData?.map((folder) => folder.id);
  const folderChildren = tableData?.map((folder) => folder.folderId);
  const folderDataInDb = tableData?.map((folder) => folder.folderId) || [];
  if (status === "loading" || loadingFolders || loadingTableData)
    return <LoadingPage page={true} />;
  return (
    <div className="not-prose mx-auto mt-6 mb-10 ">
      {/* <div className="flex justify-between">
        <h1 className="ml-20 mb-5 text-3xl font-light">ΦΑΚΕΛΟΙ ΣΤΟΝ ΔΙΣΚΟ</h1>
      </div>
      <div className="w-full space-x-2 overflow-x-auto">
        {folders.map((folder, i) => {
          return <Folder key={i} folderName={folder} />;
        })}
      </div>
      <div className="h-10"></div> */}
      <div className="mockup-code">
        <pre data-prefix="~">
          <code>
            Σε περίπτωση που διαγραφής φακέλου από τον δίσκο, θα πρέπει να διαγράψουμε πρώτα τα βιβλία που υπάρχου στην βάση και μετά τον φάκελο.
          </code>
     
        </pre>
        <pre data-prefix="~">
          <code>
            Σε περίπτωση μετονομασίας φακέλου από τον δίσκο, θα πρέπει πρώτα να μεταφέρουμε τις εγγραφές στον καινούργιο φάκελο και μετά να διαγράψουμε τον παλιό.
          </code>
     
        </pre>
      </div>

      <div className="flex justify-between">
        <h1 className="ml-20 mb-5 text-3xl font-light">ΦΑΚΕΛΟΙ ΣΤΗ ΒΑΣΗ</h1>
      </div>
      <div className="space-between flex w-full overflow-x-auto">
        {folderData?.map((folder, i) => {
          return (
            <Folder
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
              key={i}
              folderName={folder.name}
              id={folder?.id}
              foldersInDisk={libraries}
              folderDataInDb={folderDataInDb}
            />
          );
        })}
      </div>
      <div className="h-10"></div>
      <div className="flex justify-between">
        <h1 className="ml-20 mb-5 text-3xl font-light">
          ΒΙΒΛΙΑ ΣΤΗ ΒΑΣΗ ΑΝΑ ID ΦΑΚΕΛΟΥ
        </h1>
      </div>
      <div className="space-between flex w-full overflow-x-auto">
        {tableData?.map((folder, i) => {
          return (
            <TableData
              key={i}
              id={folder?.folderId}
              count={folder._count._all}
              selectedFolder={selectedFolder}
              foldersInDb={foldersInDb}
              foldersChildren={folderChildren}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FolderChanges;
interface FolderProps {
  id: number;
  folderName: string;
  foldersInDisk?: string[];
  selectedFolder: number | null;
  setSelectedFolder: React.Dispatch<React.SetStateAction<number | null>>;
  folderDataInDb?: number[];
}
//get random color from number
const getRandomColor = (id?: number) => {
  if (!id) return "bg-primary";
  const colors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-rose-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-purple-500",
    "bg-fuchsia-500",
  ];
  return colors[id % colors.length];
};

// // get random color from text and avoid collisions
// const getRandomColorFromText = (text: string) => {
//     const colors = [
//         "text-red-500",
//         "text-yellow-500",
//         "text-green-500",
//         "text-blue-500",
//         "text-indigo-500",
//         "text-purple-500",
//         "text-pink-500",

//     ];
//     const hash = text.split("").reduce((prevHash, currVal) =>
//         (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
//     return colors[Math.abs(hash) % colors.length];
// };

const Folder = ({
  id,
  folderName,
  foldersInDisk,
  selectedFolder,
  setSelectedFolder,
  folderDataInDb,
}: FolderProps) => {
  const isInDisk = foldersInDisk?.includes(folderName);
  const folderHasTableData = folderDataInDb?.includes(id);
  const isSelected = selectedFolder === id;

  const { openModal, closeModal } = useModalStore();
  const utils = trpc.useContext();
  const { mutate } = trpc.folder.delete.useMutation({
    onSuccess: () => {
      utils.folder.getAllNoPagination.invalidate();
    },
  });

  const handleDelete = () => {
    openModal(
      <ModalContent
        title="Διαγραφή Δεδομένων"
        acceptAction={() => {
          mutate({ id });
          notify({
            message: "Eπιτυχής Διαγραφή Δεδομένων",
            type: "success",
          });
          closeModal();
          if (selectedFolder === id || selectedFolder === null)
            setSelectedFolder(null);
        }}
        acceptButtonText="ΔΙΑΓΡΑΦΗ"
        rejectButtonText="ΑΚΥΡΟ"
        rejectAction={() => {
          closeModal();
        }}
      >
        <p>Είστε σίγουροι για την διαγραφή των δεδομένων;</p>
      </ModalContent>
    );
  };

  return (
    <div
      className={clsx(
        "stats m-5 text-primary-content",
        getRandomColor(id),
        isSelected && "outline outline-4 outline-base-content"
      )}
      onClick={() => setSelectedFolder(id)}
    >
      <div className="stat">
        <div className="font-bold text-primary-content">
          <div className="font-bold text-primary-content">id: {id}</div>
          <div className="font-bold text-primary-content">
            Όνομα: {folderName}
          </div>
        </div>
        <div className="font-bold  text-primary-content">
          {isInDisk ? (
            <span>Είναι στο δίσκο</span>
          ) : (
            <span className="text-error">Δεν είναι στο δίσκο</span>
          )}
        </div>
        <div className="stat-value">
          {isInDisk ? (
            <CircleStackIcon className="m-auto h-28" />
          ) : (
            <XMarkIcon className="m-auto h-28" />
          )}
        </div>
        <div className="stat-actions m-auto space-y-2">
          {!folderHasTableData && (
            <button
              className="btn btn-secondary btn-sm block w-full"
              onClick={handleDelete}
            >
              ΔΙΑΓΡΑΦΗ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface TableDataProps {
  id: number;
  count: number;
  selectedFolder: number | null;
  foldersInDb?: number[];
  foldersChildren?: number[];
}

const TableData = ({
  id,
  count,
  selectedFolder,
  foldersInDb,
  foldersChildren,
}: TableDataProps) => {
  const isInDb = foldersInDb?.includes(id);
  const { openModal, closeModal } = useModalStore();
  const utils = trpc.useContext();
  const { mutate } = trpc.book.deleteByFolderId.useMutation({
    onSuccess: () => {
      utils.folder.getBookGroups.invalidate();
    },
  });

  const { mutate: transferBooks } = trpc.book.tranferToOtherFolder.useMutation({
    onSuccess: () => {
      utils.folder.getBookGroups.invalidate();
      utils.folder.getAllNoPagination.invalidate();
    },
  });

  const handleDelete = () => {
    openModal(
      <ModalContent
        title="Διαγραφή Δεδομένων"
        acceptAction={() => {
          mutate({ id });
          notify({
            message: "Eπιτυχής Διαγραφή Δεδομένων",
            type: "success",
          });
          closeModal();
        }}
        acceptButtonText="ΔΙΑΓΡΑΦΗ"
        rejectButtonText="ΑΚΥΡΟ"
        rejectAction={() => {
          closeModal();
        }}
      >
        <p>Είστε σίγουροι για την διαγραφή των δεδομένων;</p>
      </ModalContent>
    );
  };

  const handleTranfer = () => {
    openModal(
      <ModalContent
        title="Μεταφορά Δεδομένων"
        acceptAction={() => {
          if (selectedFolder) {
            transferBooks({ fromId: id, toId: selectedFolder });
            closeModal();
            notify({
              message: "Τα βιβλία μεταφέρθηκαν επιτυχώς",
              type: "success",
            });
          } else {
            notify({ message: "Δεν έχετε επιλέξει φάκελο", type: "error" });
          }
        }}
        acceptButtonText="ΥΠΟΒΟΛΗ"
        rejectButtonText="ΑΚΥΡΟ"
        rejectAction={() => {
          closeModal();
        }}
      >
        <p>{`Είστε σίγουροι για την μεταφορά των βιβλίων από τον φάκελο με id ${id} στον φάκελο με id ${selectedFolder} ;`}</p>
      </ModalContent>
    );
  };

  return (
    <div className={clsx("stats m-5 text-primary-content", getRandomColor(id))}>
      <div className="stat">
        <div className="font-bold  text-primary-content">id: {id}</div>
        <div className="font-bold  text-primary-content">Βιβλία: {count}</div>
        <div className="font-bold  text-primary-content">
          {isInDb ? (
            <span>Εχει φάκελο στη βάση</span>
          ) : (
            <span className="text-error">Δεν έχει φάκελο στη βάση</span>
          )}
        </div>

        <div className="stat-value">
          {isInDb ? (
            <TableCellsIcon className="m-auto h-28" />
          ) : (
            <XMarkIcon className="m-auto h-28" />
          )}
        </div>
        <div className="stat-actions m-auto space-y-2">
          <button
            className="btn btn-secondary btn-sm block w-full"
            onClick={handleDelete}
          >
            ΔΙΑΓΡΑΦΗ
          </button>
          {selectedFolder && !foldersChildren?.includes(selectedFolder) && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleTranfer}
            >
              ΜΕΤΑΦΟΡΑ ΣΕ ΦΑΚΕΛΟ ΜΕ ID:{selectedFolder}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

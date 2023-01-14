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
import { useQuery } from "@tanstack/react-query";

const CleanUp = () => {
  const r = useRouter();
  // get folder with trpc
  const { data, status } = useSession();
  // get folders with useFolderstore
  const state = useLibraryStore();
  const librariesOnDisk = state.libraries;

  const fetchFolders = async () => {
    const res = await fetch("/api/read_folders");
    const data = await res.json();
    return data;
  };

  const { data: foldersOnDiskData, isLoading: loadingFoldersOnDisk } = useQuery<
    string[]
  >(["read_folders"], fetchFolders);

  const { data: libraryData, isLoading: loadingLibraries } =
    trpc.library.getAllNoPagination.useQuery();

  const { data: folderData, isLoading: loadingFolders } =
    trpc.folder.getAllNoPagination.useQuery();

  const { data: subFolderData, isLoading: loadingSubFolders } =
    trpc.subFolder.getAllNoPagination.useQuery();

  const { data: tableDataByLibrary, isLoading: loadingTableDataByLibrary } =
    trpc.library.getBookGroups.useQuery();

  const { data: tableDataByFolder, isLoading: loadingTableDataByFolder } =
    trpc.folder.getBookGroups.useQuery();

  const { data: tableDataBySubFolder, isLoading: loadingTableDataBySubolder } =
    trpc.subFolder.getBookGroups.useQuery();

  useEffect(() => {
    if (!(status === "loading")) {
      if (!(data?.user?.role === "admin")) {
        r.push(HOME_URL);
      }
    }
  }, [data, r, status]);

  const librariesInDb = libraryData?.map((library) => library.id);
  //   const libraryChildren = tableData?.map((library) => library.libraryId);
  const libraryDataInDb = tableDataByLibrary?.map((td) => td.libraryId) || [];
  const folderDataInDb = tableDataByFolder?.map((td) => td.folderId) || [];
  const subFolderDataInDb =
    tableDataBySubFolder?.map((td) => td.subFolderId) || [];
  if (
    status === "loading" ||
    loadingLibraries ||
    loadingFolders ||
    loadingSubFolders ||
    loadingTableDataByLibrary ||
    loadingTableDataByFolder ||
    loadingTableDataBySubolder ||
    loadingFoldersOnDisk
  )
    return <LoadingPage page={true} />;
  return (
    <div className="not-prose mx-auto mt-6 mb-10 ">
      <div className="mockup-code">
        <pre data-prefix="~">
          <code>
           {`Σε περίπτωση διαγραφής φακέλου από τον δίσκο, η σειρά διαγραφής είναι από κάτω προς τα πάνω.
      ΒΙΒΛΙΑ -> ΥΠΟΦΑΚΕΛΟΙ -> ΦΑΚΕΛΟΙ -> ΒΙΒΛΙΟΘΗΚΕΣ `}
          </code>
        </pre>
      
      </div>

      <div className="flex justify-between mt-10">
        <h1 className="ml-20 mb-5 text-3xl font-light">ΒΙΒΛΙΟΘΗΚΕΣ ΣΤΗ ΒΑΣΗ</h1>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {libraryData?.map((library, i) => {
          const isOnDisk = librariesOnDisk?.includes(library.name);
          const libraryHasTableData = libraryDataInDb?.includes(library.id);
          return (
            <Library
              key={i}
              libraryName={library.name}
              id={library?.id}
              isOnDisk={isOnDisk}
              hasRelatedData={libraryHasTableData}
            />
          );
        })}
      </div>
      <div className="h-10"></div>

      <div className="flex justify-between">
        <h1 className="ml-20 mb-5 text-3xl font-light">ΦΑΚΕΛΟΙ ΣΤΗ ΒΑΣΗ</h1>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {folderData?.map((folder, i) => {
          const isOnDisk =
            foldersOnDiskData &&
            foldersOnDiskData.some((path) => {
              return path.includes(`${folder.library.name}/${folder.name}`);
            });
          const hasRelatedData = folderDataInDb?.includes(folder?.id);

          return (
            <Folder
              key={i}
              folderName={folder.name}
              id={folder?.id}
              libraryId={folder?.libraryId}
              isOnDisk={isOnDisk === true}
              hasRelatedData={hasRelatedData}
            />
          );
        })}
      </div>
      <div className="h-10"></div>

      <div className="flex justify-between">
        <h1 className="ml-20 mb-5 text-3xl font-light">ΥΠΟΦΑΚΕΛΟΙ ΣΤΗ ΒΑΣΗ</h1>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {subFolderData?.map((subFolder, i) => {
          const isOnDisk =
            foldersOnDiskData &&
            foldersOnDiskData.some((path) => {
              return path.includes(
                `${subFolder?.library?.name}/${subFolder?.folder?.name}/${subFolder?.name}`
              );
            });
          const hasRelatedData = subFolderDataInDb?.includes(subFolder?.id);

          return (
            <SubFolder
              key={i}
              id={subFolder?.id}
              subFolderName={subFolder.name}
              folderId={subFolder?.folderId}
              libraryId={subFolder?.libraryId ?? 0}
              isOnDisk={isOnDisk ?? true}
              hasRelatedData={hasRelatedData}
            />
          );
        })}
      </div>
      <div className="h-10"></div>
      <div className="flex justify-between">
        <h1 className="ml-20 mb-5 text-3xl font-light">
          ΒΙΒΛΙΑ ΣΤΗ ΒΑΣΗ ΑΝΑ ID ΒΙΒΛΙΟΘΗΚΗΣ
        </h1>
      </div>
      <div className="space-between flex w-full overflow-x-auto">
        {tableDataByLibrary?.map((library, i) => {
          return (
            <TableData
              key={i}
              id={library?.libraryId ?? 0}
              count={library._count._all}
              librariesInDb={librariesInDb}
              //   libraryChildren={libraryChildren}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CleanUp;

interface LibraryProps {
  id: number;
  libraryName: string;
  isOnDisk?: boolean;
  hasRelatedData?: boolean;
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


const Library = ({
  id,
  libraryName,
  isOnDisk,
  hasRelatedData,
}: LibraryProps) => {
  const { openModal, closeModal } = useModalStore();
  const utils = trpc.useContext();
  const { mutate } = trpc.library.delete.useMutation({
    onSuccess: () => {
      notify({
        message: "Eπιτυχής Διαγραφή Δεδομένων",
        type: "success",
      });
      utils.library.getAllNoPagination.invalidate();
      closeModal();
    },
    onError: () => {
      notify({
        message: "Σφάλμα κατά την Διαγραφή των Δεδομένων",
        type: "error",
      });
    },
  });

  const handleDelete = () => {
    openModal(
      <ModalContent
        title="Διαγραφή Δεδομένων"
        acceptAction={() => mutate({ id })}
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
    <div className={clsx("stats m-5 text-primary-content", getRandomColor(id))}>
      <div className="stat">
        <div className="font-bold text-primary-content">
          <div className="font-bold text-primary-content">id: {id}</div>
          <div className="font-bold text-primary-content">
            Όνομα: {libraryName}
          </div>
        </div>
        <div className="font-bold text-primary-content">
          {isOnDisk ? (
            <span>Είναι στο δίσκο</span>
          ) : (
            <span className="font-bold text-error">Δεν είναι στο δίσκο</span>
          )}
        </div>
        <div className="stat-value">
          {isOnDisk ? (
            <CircleStackIcon className="m-auto h-28" />
          ) : (
            <XMarkIcon className="m-auto h-28" />
          )}
        </div>
        <div className="stat-actions m-auto space-y-2">
          {!hasRelatedData && !isOnDisk && (
            <button
              className="btn-secondary btn-sm btn block w-full"
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

interface FolderProps {
  id: number;
  folderName: string;
  libraryId: number;
  isOnDisk: boolean;
  hasRelatedData?: boolean;
}

const Folder = ({
  id,
  folderName,
  libraryId,
  isOnDisk,
  hasRelatedData,
}: FolderProps) => {
  // console.log("libraries on disk", librariesOnDisk);

  const { openModal, closeModal } = useModalStore();
  const utils = trpc.useContext();
  const { mutate } = trpc.folder.delete.useMutation({
    onSuccess: () => {
      notify({
        message: "Eπιτυχής Διαγραφή Δεδομένων",
        type: "success",
      });
      utils.folder.getAllNoPagination.invalidate();
      closeModal();
    },
    onError: () => {
      notify({
        message: "Σφάλμα κατά την Διαγραφή των Δεδομένων",
        type: "success",
      });
    },
  });

  const handleDelete = () => {
    openModal(
      <ModalContent
        title="Διαγραφή Δεδομένων"
        acceptAction={() => mutate({ id })}
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
        getRandomColor(libraryId)
      )}
    >
      <div className="stat">
        <div className="font-bold text-primary-content">
          <div className="font-bold text-primary-content">id: {id}</div>
          <div className="font-bold text-primary-content">
            Όνομα: {folderName}
          </div>
          <div className="font-bold text-primary-content">
            Βιβλιοθήκη: {libraryId}
          </div>
        </div>
        <div className="font-bold  text-primary-content">
          {isOnDisk ? (
            <span>Είναι στο δίσκο</span>
          ) : (
            <span className="font-bold text-error">Δεν είναι στο δίσκο</span>
          )}
        </div>
        <div className="font-bold  text-primary-content">
          {hasRelatedData ? (
            <span>Έχει συσχετισμένες εγγραφές</span>
          ) : (
            <span className="font-bold text-error">
              Δεν έχει συσχετισμένες εγγραφές
            </span>
          )}
        </div>
        <div className="stat-value">
          {isOnDisk ? (
            <CircleStackIcon className="m-auto h-28" />
          ) : (
            <XMarkIcon className="m-auto h-28" />
          )}
        </div>
        <div className="stat-actions m-auto space-y-2">
          {!hasRelatedData && !isOnDisk && (
            <button
              className="btn-secondary btn-sm btn block w-full"
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

interface SubFolderProps {
  id: number;
  subFolderName: string;
  libraryId: number;
  folderId: number;
  isOnDisk: boolean;
  hasRelatedData?: boolean;
}

const SubFolder = ({
  id,
  subFolderName,
  libraryId,
  folderId,
  isOnDisk,
  hasRelatedData,
}: SubFolderProps) => {
  // console.log("libraries on disk", librariesOnDisk);

  const { openModal, closeModal } = useModalStore();
  const utils = trpc.useContext();
  const { mutate } = trpc.subFolder.delete.useMutation({
    onSuccess: () => {
      notify({
        message: "Eπιτυχής Διαγραφή Δεδομένων",
        type: "success",
      });
      utils.subFolder.getAllNoPagination.invalidate();
      closeModal();
    },
    onError: () => {
      notify({
        message: "Σφάλμα κατά την Διαγραφή των Δεδομένων",
        type: "success",
      });
    },
  });

  const handleDelete = () => {
    openModal(
      <ModalContent
        title="Διαγραφή Δεδομένων"
        acceptAction={() => mutate({ id })}
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
        getRandomColor(libraryId)
      )}
    >
      <div className="stat">
        <div className="font-bold text-primary-content">
          <div className="font-bold text-primary-content">id: {id}</div>
          <div className="font-bold text-primary-content">
            Όνομα: {subFolderName}
          </div>
          <div className="font-bold text-primary-content">
            Βιβλιοθήκη: {libraryId}
          </div>
          <div className="font-bold text-primary-content">
            Φάκελος: {folderId}
          </div>
        </div>
        <div className="font-bold  text-primary-content">
          {isOnDisk ? (
            <span>Είναι στο δίσκο</span>
          ) : (
            <span className="font-bold text-error">Δεν είναι στο δίσκο</span>
          )}
        </div>
        <div className="font-bold  text-primary-content">
          {hasRelatedData ? (
            <span>Έχει συσχετισμένες εγγραφές</span>
          ) : (
            <span className="font-bold text-error">
              Δεν έχει συσχετισμένες εγγραφές
            </span>
          )}
        </div>
        <div className="stat-value">
          {isOnDisk ? (
            <CircleStackIcon className="m-auto h-28" />
          ) : (
            <XMarkIcon className="m-auto h-28" />
          )}
        </div>
        <div className="stat-actions m-auto space-y-2">
          {!hasRelatedData && !isOnDisk && (
            <button
              className="btn-secondary btn-sm btn block w-full"
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
  librariesInDb?: number[];
  //   libraryChildren?: number[];
}

const TableData = ({
  id,
  count,
  librariesInDb,
}: //   libraryChildren,
TableDataProps) => {
  const isInDb = librariesInDb?.includes(id);
  const { openModal, closeModal } = useModalStore();
  const utils = trpc.useContext();
  const { mutate } = trpc.book.deleteByLibraryId.useMutation({
    onSuccess: () => {
      utils.folder.getBookGroups.invalidate();
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

  return (
    <div className={clsx("stats m-5 text-primary-content", getRandomColor(id))}>
      <div className="stat">
        <div className="font-bold  text-primary-content">id: {id}</div>
        <div className="font-bold  text-primary-content">Βιβλία: {count}</div>
        <div className="font-bold  text-primary-content">
          {isInDb ? (
            <span>Εχει βιβλιοθήκη στη βάση</span>
          ) : (
            <span className="text-error">Δεν έχει βιβλιοθήκη στη βάση</span>
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
            className="btn-secondary btn-sm btn block w-full"
            onClick={handleDelete}
          >
            ΔΙΑΓΡΑΦΗ
          </button>
        </div>
      </div>
    </div>
  );
};

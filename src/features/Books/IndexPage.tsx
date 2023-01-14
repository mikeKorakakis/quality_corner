import {
  Bars3Icon,
  Bars2Icon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { trpc } from "@/utils/trpc";
import { Folder } from "@prisma/client";
import Link from "next/link";

interface Props {
  library: string;
}

const IndexPage = ({ library }: Props) => {
  const { data: libraries, isLoading: loadingLibraries } =
    trpc.library.getAllNoPagination.useQuery();
  const getLibraryDescription = (library: string) => {
    const libraryData = libraries && libraries?.find((f) => f.name === library);
    if (libraryData?.description) return libraryData?.description;
    else return library;
  };

  return (
    <>
      <div className="ml-20 mt-10 bg-base-100">
        <LibraryLink
          libraryDescription={getLibraryDescription(library)}
          libraryName={library}
        />
      </div>
    </>
  );
};

interface LibraryLinkProps {
  libraryDescription: string;
  libraryName: string;
}

const LibraryLink = ({ libraryDescription, libraryName }: LibraryLinkProps) => {
  return (
    <>
      <div className="flex gap-4 text-xl font-extrabold pb-2 ">
        <span className="flex-none transition ease-in-out">
          <BookOpenIcon className={"mr-4 h-6 w-6  "} aria-hidden="true" />
        </span>
        <div className="flex-1">
          <span>{libraryDescription} </span>
        </div>
      </div>

      <FolderLinks library={libraryName} />
    </>
  );
};

interface FolderLinksProps {
  library: string;
}

const FolderLinks = ({ library }: FolderLinksProps) => {
  const { data: folders, isLoading: loadingFolders } =
    trpc.folder.getAllByLibrary.useQuery({ library });

  if (loadingFolders) return <Skeleton />;

  return (
    <>
      {folders
        ?.sort(function (a, b) {
          const x = a.description ?? a.name;
          const y = b.description ?? b.name;
          if (x < y) {
            return -1;
          }
          if (y > x) {
            return 1;
          }
          return 0;
        })
        .map((folder) => {
          return (
            <FolderLink
              key={folder.id}
              folderName={folder.name}
              folderDescription={folder?.description}
              library={library}
            />
          );
        })}
    </>
  );
};

interface FolderLinkProps {
  library: string;
  folderName: string;
  folderDescription: string | null;
}

const FolderLink = ({
  library,
  folderName,
  folderDescription,
}: FolderLinkProps) => {
  return (
    <>
      <div className="flex gap-4">
        <span className="flex-none">
          <Bars2Icon className={"mr-4 h-6 w-6"} aria-hidden="true" />
        </span>
        <div className="flex-1">
          <Link href={`${library}/${folderName}`}>
            <span className="flex-1 font-bold hover:cursor-pointer hover:underline">
              {folderDescription ?? folderName}
            </span>
          </Link>
        </div>
      </div>

      <SubFolderLink library={library} folder={folderName} />
    </>
  );
};

interface SubFolderLinkProps {
  library: string;
  folder: string;
}

const SubFolderLink = ({ library, folder }: SubFolderLinkProps) => {
  const { data: subFolders, isLoading: loadingSubFolders } =
    trpc.subFolder.getAllByFolderAndLibrary.useQuery({ folder, library });
  if (loadingSubFolders) return <Skeleton />;
  return (
    <>
      {subFolders
        ?.sort(function (a, b) {
          const x = a.description ?? a.name;
          const y = b.description ?? b.name;
          if (x < y) {
            return -1;
          }
          if (y > x) {
            return 1;
          }
          return 0;
        })
        .map((subFolder) => {
          //   console.log(
          //     libraryUrl,
          //     library,
          //     folderUrl,
          //     folder,
          //     subFolderUrl,
          //     subFolder.name
          //   );
          return (
            <div key={subFolder.id}>
              <div className=" flex gap-4 pl-10 ">
                <span className="flex-none">
                  <Bars3Icon className="mr-4 h-6 w-6" aria-hidden="true" />
                </span>
                <Link href={`${library}/${folder}/${subFolder.name}`}>
                  <span className="flex-1 font-bold hover:cursor-pointer hover:underline">
                    {subFolder.description ?? subFolder.name}
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
    </>
  );
};

const Skeleton = () => {
  return <div className="my-1 flex h-8 animate-pulse gap-4 bg-base-300 max-w-sm"></div>;
};

export default IndexPage;

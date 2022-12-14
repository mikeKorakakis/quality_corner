import Link from "next/link";
import clsx from "clsx";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  MapIcon,
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  CogIcon,
  ClipboardDocumentIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ArrowsRightLeftIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import { APP_NAME, POST_LOGOUT_REDIRECT_URL } from "@/config";
import { Theme } from "./ThemeSelector";
import { useLibraryStore } from "@/core/stores/libraryStore";
import { trpc } from "@/utils/trpc";

const title = APP_NAME;
const [title0, title1] = title.split(" ");
interface Props {
  children: ReactNode;
}

const urlMap: Record<string, string> = {
  library: "Βιβλιογραφίες",
  folders: "Φάκελοι",
  changes: "Aλλαγές",
};

const secondaryMenuCation = "Διαχειριστής";

const Layout = ({ children }: Props) => {
  // get authentication status
  const state = useLibraryStore();
  const { status, data } = useSession();
  const user = data?.user;
  const role = user?.role;
  const username = user?.name;
  const roleText =
    role === "admin"
      ? "Διαχειριστής"
      : role === "moderator"
      ? "Συντάκτης"
      : "Χρήστης";
  const isLoggedIn = status === "authenticated";
  const router = useRouter();
  const slug = router.query.slug;

  // get folders from trpc
  const { data: libraries, isLoading: loadingLibraries } =
    trpc.library.getAllNoPagination.useQuery();
  const getFolderDescription = (library: string) => {
    const libraryData = libraries?.find((f) => f.name === library);
    if (libraryData?.description) return libraryData?.description;
    else return library;
  };

  const navigation = state.libraries.map((library) => {
    const { data: folders, isLoading: loadingFolders } =
    trpc.folder.getAllNoPagination.useQuery();
    return {
      name: library,
      href: `/library/${library}`,
      current: slug === library,
      icon: BookOpenIcon,
      count: null,
      folders : 
    };
  });

  const adminNavigation = [
    {
      name: "Φάκελοι",
      href: "/folders",
      current: router.pathname === "/folders",
      icon: FolderIcon,
      count: null,
    },
    {
      name: "Αλλαγές",
      href: "/changes",
      current: router.pathname === "/changes",
      icon: ArrowsRightLeftIcon,
      count: null,
    },
  ];
  const getPageTitle = () => {
    const path =
      (router?.pathname &&
        router?.pathname?.split("/") &&
        router?.pathname?.split("/")[1] &&
        router?.pathname?.split("/")[1]?.toLowerCase()) ||
      "";
    return urlMap[path];
  };

  const onSignout = () => {
    signOut({ callbackUrl: POST_LOGOUT_REDIRECT_URL });
  };

  const accountNavigation = isLoggedIn
    ? [
        { name: `${username}, ${roleText}`, onClick: () => null },
        { name: "ΑΠΟΣΥΝΔΕΣΗ", onClick: onSignout },
      ]
    : [{ name: "ΣΥΝΔΕΣΗ", onClick: () => router.push("/auth/signin") }];
  //   const navigation = adminNavigation;

  return (
    <>
      <div className="drawer-mobile drawer bg-base-100">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div
          className="drawer-content overflow-hidden"
          style={{ scrollBehavior: "smooth", scrollPaddingTop: "5rem" }}
        >
          <div
            className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content 
          shadow-sm backdrop-blur transition-all duration-100"
          >
            <nav className="navbar w-full">
              <div className="flex flex-1 md:gap-1 lg:gap-2">
                <span
                  className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
                  data-tip="Menu"
                >
                  <label
                    htmlFor="drawer"
                    className="btn-ghost drawer-button btn-square btn lg:hidden"
                  >
                    <svg
                      width={20}
                      height={20}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </label>
                </span>
                <div className="flex items-center gap-2 lg:hidden">
                  <Link href="/">
                    <a
                      aria-current="page"
                      aria-label="Homepage"
                      className="flex-0 btn-ghost btn px-2 "
                    >
                      <div className="font-title inline-flex text-lg text-primary transition-all duration-200 md:text-3xl">
                        <span className="lowercase text-primary">{title0}</span>
                        <span className="uppercase text-base-content">
                          {title1}
                        </span>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="hidden w-full max-w-sm lg:flex"></div>
              </div>
              <div className="flex-0">
                <div className="hidden flex-none items-center ">
                  <UserCircleIcon className=" h-8 w-8" />
                </div>
                <Theme />
                {/* <Theme/>
              <Language/> */}
                {
                  <div title="Change Theme" className="dropdown-end dropdown ">
                    <div
                      tabIndex={0}
                      className="btn-ghost btn gap-1 normal-case"
                    >
                      <UserCircleIcon className=" h-8 w-8" />
                    </div>
                    <div className="dropdown-content rounded-t-box rounded-b-box top-px mt-16 h-fit max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl">
                      <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
                        {accountNavigation.map((item, i) => (
                          <div key={item.name}>
                            {i === 0 && isLoggedIn ? (
                              <div className="overflow-hidden rounded-lg ">
                                <div
                                  className={clsx(
                                    "bg-gray-100",
                                    "block px-4 py-2 text-center text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </div>
                              </div>
                            ) : (
                              <div className="overflow-hidden rounded-lg outline outline-2 outline-offset-2 outline-base-content">
                                <div
                                  onClick={() => item.onClick()}
                                  className={clsx(
                                    "bg-gray-100",
                                    "block cursor-pointer px-4 py-2 text-center text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </nav>
          </div>

          <div className="p-6 pb-16">
            <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
              <div className="max-w-8xl prose w-full flex-grow">
                <div className="breadcrumbs text-sm">
                  <ul>
                    <li>
                      <Link href="/">
                        <>
                          <FolderIcon className="mr-1 h-4 w-4 font-bold" />
                          Αρχική
                        </>
                      </Link>
                    </li>
                    {getPageTitle() && (
                      <li>
                        <FolderOpenIcon className="mr-1 h-4 w-4 font-bold" />
                        {getPageTitle()}
                      </li>
                    )}
                  </ul>
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
        <div
          className="drawer-side"
          style={{ scrollBehavior: "smooth", scrollPaddingTop: "5rem" }}
        >
          <label htmlFor="drawer" className="drawer-overlay" />
          <aside className="w-80 bg-base-200">
            <div className="sticky top-0 z-20 hidden items-center gap-2 bg-base-200 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ">
              <Link href="/">
                <a
                  aria-current="page"
                  aria-label="Homepage"
                  className="flex-0 btn-ghost btn px-2"
                >
                  <div className="font-title inline-flex text-lg text-primary transition-all duration-200 md:text-3xl">
                    <span className="lowercase">{title0}</span>
                    <span className="uppercase text-base-content">
                      {title1}
                    </span>
                  </div>
                </a>
              </Link>
            </div>
            <div className="h-4" />
            <ul className="menu menu-compact flex flex-col p-0 px-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  {loadingLibraries ? (
                    <div className="my-1 flex h-8 animate-pulse gap-4 bg-base-300"></div>
                  ) : (
                    <Link href={item.href}>
                      <div
                        className={clsx("flex gap-4", item.current && "active")}
                      >
                        <span className="flex-none">
                          <item.icon
                            className={"mr-4 h-6 w-6"}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="flex-1">
                          {getFolderDescription(item.name)}
                        </span>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
              {role === "admin" && (
                <>
                  <li />
                  <li className="menu-title inline gap-4">
                    <div className="flex gap-4">
                      <span className="flex-none">
                        <CogIcon
                          className={"mr-4 h-6 w-6"}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="flex-1 pt-1">{secondaryMenuCation}</span>
                    </div>
                  </li>
                  {adminNavigation.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <div
                          className={clsx(
                            "flex gap-4",
                            item.current && "active"
                          )}
                        >
                          <span className="flex-none">
                            <item.icon
                              className={"mr-4 h-6 w-6"}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="flex-1">{item.name}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
            <ul className="menu menu-compact flex flex-col p-0 px-4"></ul>
            <div className="pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t from-base-200 to-transparent" />
          </aside>
        </div>
      </div>
    </>
  );
};

export default Layout;

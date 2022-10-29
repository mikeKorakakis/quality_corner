import clsx from "clsx";
import Link from "next/link";
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
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Transition, Dialog, Menu, Disclosure } from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";
// import { Inter } from '@next/font/google'
// const inter = Inter()
//generate tailwindcsss layout
const title = "Title";
const Layout: React.FC<any> = ({ children }) => {
  const isLoggedIn = true;
  const map = false;
  const router = useRouter();

  const currentPath = router.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const defaultOpen = currentPath.includes("title2");

  const adminNavigation = [
    {
      name: "Title 1",
      href: "/title1",
      current: true, //currentPath.includes("title1"),
      icon: BookOpenIcon,
      count: null,
    },
    {
      name: "Title 2",
      href: "/title2",
      current: false, //currentPath.includes("title1"),
      icon: BookOpenIcon,
      count: null,
    },
    {
      name: "Options",
      icon: CogIcon,
      current: false,
      href: "#",
      children: [
        {
          name: "Title 2",
          href: "/title2",
          current: currentPath.includes("title2"),
          icon: ClipboardDocumentIcon,
          count: null,
        },
        {
          name: "Title 2",
          href: "/title2",
          current: true,
          icon: ClipboardDocumentIcon,
          count: null,
        },
      ],
    },

    // { name: "Documents", href: "#", icon: InboxMarkIcon, current: false, count: null },
    // { name: "Reports", href: "#", icon: ChartBarIcon, current: false, count: null },
  ];

  const logout = () => {
    console.log("logout");
  };
  const accountNavigation = [{ name: "Logout", onClick: logout }];
  const navigation = adminNavigation;

  return (
    <div className="min-h-full">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex xl:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-base-200 pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="px mx-auto flex w-full flex-shrink-0 items-center px-4">
                <Image
                  className="block h-8 w-auto xl:hidden"
                  onClick={() => router.push("/")}
                  src="/assets/logo.png"
                  alt="Workflow"
                  width={40}
                  height={40}
                />
                <span className="pl-3 font-mono text-2xl font-bold ">
                  {title}
                </span>
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="space-y-1 px-2">
                  {navigation.map((item) =>
                    !item.children ? (
                      <Link href={item.href} key={item.name}>
                        <div
                          className={clsx(
                            item.current ? "bg-base-300 " : "hover:bg-base-100",
                            "text-large group flex items-center rounded-md px-2 py-2 font-bold"
                          )}
                        >
                          <item.icon
                            className={"mr-4 h-6 w-6"}
                            aria-hidden="true"
                          />
                          {item.name}
                        </div>
                      </Link>
                    ) : (
                      <Disclosure
                        defaultOpen={defaultOpen}
                        as="div"
                        key={item.name}
                        className="space-y-1"
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="text-large group flex items-center rounded-md px-2 py-2 font-bold">
                              <svg
                                className={clsx(
                                  open
                                    ? "rotate-90 text-gray-400"
                                    : "text-gray-300",
                                  "mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400"
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6 6L14 10L6 14V6Z"
                                  fill="currentColor"
                                />
                              </svg>
                              {item.name}
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-1">
                              {item.children.map((subItem) => (
                                <Link key={subItem.name} href={subItem.href}>
                                  <div
                                    className={clsx(
                                      subItem.current
                                        ? "bg-base-300"
                                        : " hover:bg-base-100",
                                      "text-large group flex items-center rounded-md py-2 pl-8 pr-2 font-bold"
                                    )}
                                  >
                                    <subItem.icon
                                      className={"mr-3 h-6 w-6"}
                                      aria-hidden="true"
                                    />
                                    {subItem.name}
                                  </div>
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  )}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:flex xl:w-64 xl:flex-col">
        <div className="flex flex-grow flex-col  overflow-y-auto bg-base-200">
          <div className="flex h-16 flex-shrink-0 items-center bg-base-200 px-4">
            <Image
              onClick={() => router.push("/")}
              className="h-8 w-auto cursor-pointer"
              src="/assets/logo.png"
              alt="Workflow"
              width={40}
              height={40}
            />
            <span className="pl-3 font-mono text-2xl font-bold ">{title}</span>
          </div>
          <div className="mt-3 flex flex-1 flex-col ">
            <nav
              className="flex-1 space-y-1 p-4 px-2 pt-8 pb-4"
              aria-label="Sidebar"
            >
              {navigation.map((item) =>
                !item.children ? (
                  <div key={item.name}>
                    <Link href={item.href} key={item.name}>
                      <div
                        className={clsx(
                          item.current
                            ? "bg-base-300 "
                            : "text-primary-100 hover:bg-base-100",
                          "text-medium group flex items-center rounded-md px-2 py-2 font-bold"
                        )}
                      >
                        <item.icon
                          className={"mr-3 h-6 w-6"}
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    </Link>
                  </div>
                ) : (
                  <Disclosure
                    defaultOpen={defaultOpen}
                    as="div"
                    key={item.name}
                    className="space-y-1"
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={clsx(
                            item.current
                              ? "bg-base-200 text-white"
                              : "text-primary-100 hover:bg-base-200",
                            "text-medium group flex items-center rounded-md px-2 py-2 font-bold"
                          )}
                        >
                          <svg
                            className={clsx(
                              open
                                ? "rotate-90 text-gray-400"
                                : "text-gray-300",
                              "mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400"
                            )}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                          {item.name}
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                          {item.children.map((subItem) => (
                            <Link key={subItem.name} href={subItem.href}>
                              <div
                                className={clsx(
                                  subItem.current
                                    ? "bg-base-300 "
                                    : "hover:bg-base-100",
                                  "text-medium group flex items-center rounded-md py-2 pl-8 pr-2 font-bold"
                                )}
                              >
                                <subItem.icon
                                  className={"mr-3 h-6 w-6"}
                                  aria-hidden="true"
                                />
                                {subItem.name}
                              </div>
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col xl:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="focus:ring-primary-500 border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="grow"></div>

            {isLoggedIn && (
              <div className="ml-4 flex items-center xl:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="focus:ring-primary-500 flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={
                          // user?.image ||
                          "/assets/user.png"
                        }
                        alt=""
                        width={28}
                        height={28}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {accountNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <div
                              onClick={item.onClick}
                              className={clsx(
                                active ? "bg-gray-100" : "",
                                "block cursor-pointer px-4 py-2 text-center text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </div>
        </div>

        <div className="h-full bg-base-100 pt-10">
          <main>
            <div className="max-w-8xl mx-auto h-full sm:px-6 xl:px-8">
              <div className="h-full px-4 py-8 sm:px-0">
                <div className="h-full">{children}</div>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

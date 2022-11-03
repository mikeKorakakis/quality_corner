import Link from "next/link";

const Test2 = () => {
  return (
    <>
   <>
  
  <div className="bg-base-100 drawer drawer-mobile">
    <input id="drawer" type="checkbox" className="drawer-toggle" />
    <div
      className="drawer-content"
      style={{ scrollBehavior: "smooth", scrollPaddingTop: "5rem" }}
    >
      <div
        className="
  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 
  bg-base-100 text-base-content shadow-sm
  "
      >
        <nav className="navbar w-full">
          <div className="flex flex-1 md:gap-1 lg:gap-2">
            <span
              className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
              data-tip="Menu"
            >
              <label
                htmlFor="drawer"
                className="btn btn-square btn-ghost drawer-button lg:hidden"
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
                className="flex-0 btn btn-ghost px-2 "
              >
                <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                  <span className="lowercase text-primary">daisy</span>
                  <span className="uppercase text-base-content">UI</span>
                </div>
              </a>
              </Link>
              <a
                href="/docs/changelog"
                className="link link-hover font-mono text-xs text-opacity-50 "
              >
                <div data-tip="Changelog" className="tooltip tooltip-bottom">
                  2.38.0
                </div>
              </a>
            </div>
            <div className="hidden w-full max-w-sm lg:flex">
            
            </div>
          </div>
          <div className="flex-0">
            <div className="items-center flex-none hidden ">
              <a
               
                href="/components"
                className="btn btn-ghost drawer-button normal-case"
              >
                <svg
                  width={20}
                  height={20}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 fill-current md:mr-2"
                >
                  <path d="M6.5,22 C4.01471863,22 2,19.9852814 2,17.5 C2,15.0147186 4.01471863,13 6.5,13 C8.98528137,13 11,15.0147186 11,17.5 C11,19.9852814 8.98528137,22 6.5,22 Z M17.5,22 C15.0147186,22 13,19.9852814 13,17.5 C13,15.0147186 15.0147186,13 17.5,13 C19.9852814,13 22,15.0147186 22,17.5 C22,19.9852814 19.9852814,22 17.5,22 Z M6.5,11 C4.01471863,11 2,8.98528137 2,6.5 C2,4.01471863 4.01471863,2 6.5,2 C8.98528137,2 11,4.01471863 11,6.5 C11,8.98528137 8.98528137,11 6.5,11 Z M17.5,11 C15.0147186,11 13,8.98528137 13,6.5 C13,4.01471863 15.0147186,2 17.5,2 C19.9852814,2 22,4.01471863 22,6.5 C22,8.98528137 19.9852814,11 17.5,11 Z M17.5,9 C18.8807119,9 20,7.88071187 20,6.5 C20,5.11928813 18.8807119,4 17.5,4 C16.1192881,4 15,5.11928813 15,6.5 C15,7.88071187 16.1192881,9 17.5,9 Z M6.5,9 C7.88071187,9 9,7.88071187 9,6.5 C9,5.11928813 7.88071187,4 6.5,4 C5.11928813,4 4,5.11928813 4,6.5 C4,7.88071187 5.11928813,9 6.5,9 Z M17.5,20 C18.8807119,20 20,18.8807119 20,17.5 C20,16.1192881 18.8807119,15 17.5,15 C16.1192881,15 15,16.1192881 15,17.5 C15,18.8807119 16.1192881,20 17.5,20 Z M6.5,20 C7.88071187,20 9,18.8807119 9,17.5 C9,16.1192881 7.88071187,15 6.5,15 C5.11928813,15 4,16.1192881 4,17.5 C4,18.8807119 5.11928813,20 6.5,20 Z" />
                </svg>
                Components
              </a>
            </div>
            <div title="Change Theme" className="dropdown dropdown-end ">
              <div tabIndex={0} className="btn gap-1 normal-case btn-ghost">
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
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                <span className="hidden md:inline">Theme</span>
                <svg
                  width="12px"
                  height="12px"
                  className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
                </svg>
              </div>
              <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
                <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 outline"
                    data-set-theme="light"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="light"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            light
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="dark"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="dark"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            dark
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="cupcake"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="cupcake"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            cupcake
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="bumblebee"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="bumblebee"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            bumblebee
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="emerald"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="emerald"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            emerald
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="corporate"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="corporate"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            corporate
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="synthwave"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="synthwave"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            synthwave
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="retro"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="retro"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            retro
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="cyberpunk"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="cyberpunk"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            cyberpunk
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="valentine"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="valentine"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            valentine
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="halloween"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="halloween"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            halloween
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />
                            <div className="bg-accent w-2 rounded" />
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="garden"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="garden"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            garden
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="forest"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="forest"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            forest
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="aqua"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="aqua"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            aqua
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="lofi"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="lofi"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            lofi
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="pastel"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="pastel"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            pastel
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="fantasy"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="fantasy"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            fantasy
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="wireframe"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="wireframe"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            wireframe
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="black"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="black"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            black
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="luxury"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="luxury"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            luxury
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="dracula"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="dracula"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            dracula
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="cmyk"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="cmyk"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            cmyk
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="autumn"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="autumn"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            autumn
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="business"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="business"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            business
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="acid"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="acid"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            acid
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="lemonade"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="lemonade"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            lemonade
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="night"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="night"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            night
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="coffee"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="coffee"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            coffee
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                    data-set-theme="winter"
                    data-act-class="outline"
                  >
                    <div
                      data-theme="winter"
                      className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                    >
                      <div className="grid grid-cols-5 grid-rows-3">
                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                          <div className="flex-grow text-sm font-bold">
                            winter
                          </div>{" "}
                          <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="bg-primary w-2 rounded" />{" "}
                            <div className="bg-secondary w-2 rounded" />{" "}
                            <div className="bg-accent w-2 rounded" />{" "}
                            <div className="bg-neutral w-2 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <a
                    className="outline-base-content overflow-hidden rounded-lg"
                    href="/theme-generator/"
                  >
                    <div className="hover:bg-neutral hover:text-neutral-content w-full cursor-pointer font-sans">
                      <div className="flex gap-2 p-3">
                        <svg
                          width={24}
                          height={24}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 512 512"
                        >
                          <path d="M96,208H48a16,16,0,0,1,0-32H96a16,16,0,0,1,0,32Z" />
                          <line x1="90.25" y1="90.25" x2="124.19" y2="124.19" />
                          <path d="M124.19,140.19a15.91,15.91,0,0,1-11.31-4.69L78.93,101.56a16,16,0,0,1,22.63-22.63l33.94,33.95a16,16,0,0,1-11.31,27.31Z" />
                          <path d="M192,112a16,16,0,0,1-16-16V48a16,16,0,0,1,32,0V96A16,16,0,0,1,192,112Z" />
                          <line
                            x1="293.89"
                            y1="90.25"
                            x2="259.95"
                            y2="124.19"
                          />
                          <path d="M260,140.19a16,16,0,0,1-11.31-27.31l33.94-33.95a16,16,0,0,1,22.63,22.63L271.27,135.5A15.94,15.94,0,0,1,260,140.19Z" />
                          <line
                            x1="124.19"
                            y1="259.95"
                            x2="90.25"
                            y2="293.89"
                          />
                          <path d="M90.25,309.89a16,16,0,0,1-11.32-27.31l33.95-33.94a16,16,0,0,1,22.62,22.63l-33.94,33.94A16,16,0,0,1,90.25,309.89Z" />
                          <path d="M219,151.83a26,26,0,0,0-36.77,0l-30.43,30.43a26,26,0,0,0,0,36.77L208.76,276a4,4,0,0,0,5.66,0L276,214.42a4,4,0,0,0,0-5.66Z" />
                          <path d="M472.31,405.11,304.24,237a4,4,0,0,0-5.66,0L237,298.58a4,4,0,0,0,0,5.66L405.12,472.31a26,26,0,0,0,36.76,0l30.43-30.43h0A26,26,0,0,0,472.31,405.11Z" />
                        </svg>{" "}
                        <div className="flex-grow text-sm font-bold">
                          Make your theme!
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/* <div title="Change Language" className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost gap-1 normal-case">
                <svg
                  className="inline-block h-4 w-4 fill-current md:h-5 md:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 512 512"
                >
                  <path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z" />
                  <path d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z" />
                </svg>
                <svg
                  width="12px"
                  height="12px"
                  className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
                </svg>
              </div>
              <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px mt-16 w-56 overflow-y-auto shadow-2xl">
                <ul className="menu menu-compact gap-1 p-3" tabIndex={0}>
                  <li>
                    <button className="flex active">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="English"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg"
                      />
                      <span className="flex flex-1 justify-between">
                        English
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="flex">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="Español"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ea-1f1f8.svg"
                      />
                      <span className="flex flex-1 justify-between">
                        Español
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="flex">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="Français"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1eb-1f1f7.svg"
                      />
                      <span className="flex flex-1 justify-between">
                        Français
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="flex">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="Indonesia"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ee-1f1e9.svg"
                      />
                      <span className="flex flex-1 justify-between">
                        Indonesia
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="flex">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="日本語"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ef-1f1f5.svg"
                      />
                      <span className="flex flex-1 justify-between">
                        日本語
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="flex">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="한국어"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f0-1f1f7.svg"
                      />
                      <span className="flex flex-1 justify-between">
                        한국어
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="flex">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="Português"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f5-1f1f9.svg"
                      />
                      <span className="flex flex-1 justify-between">
                        Português
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="flex">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="Русский"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f7-1f1fa.svg"
                      />
                      <span className="flex flex-1 justify-between">
                        Русский
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="flex">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="中文"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1e8-1f1f3.svg"
                      />
                      <span className="flex flex-1 justify-between">中文 </span>
                    </button>{" "}
                  </li>
                  <li>
                    <button className="flex">
                      <img
                        loading="lazy"
                        width={20}
                        height={20}
                        alt="繁體中文"
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f9-1f1fc.svg"
                      />{" "}
                      <span className="flex flex-1 justify-between">
                        繁體中文{" "}
                      </span>
                    </button>{" "}
                  </li>
                </ul>
              </div>
            </div> */}
            <span
              className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
              data-tip="GitHub"
            >
              <div className="flex-none items-center">
                <a
                  aria-label="Github"
                  target="_blank"
                  href="https://github.com/saadeghi/daisyui"
                  rel="noopener noreferrer"
                  className="btn btn-ghost drawer-button btn-square normal-case"
                >
                  <svg
                    width={20}
                    height={20}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="inline-block h-5 w-5 fill-current md:h-6 md:w-6"
                  >
                    <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z" />
                  </svg>
                </a>
              </div>
            </span>
          </div>
        </nav>
      </div>
      <div className="p-6 pb-16">
        
        <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
        <div className="prose w-full max-w-4xl flex-grow">
</div>
        </div>
      </div>
    </div>
    <div
      className="drawer-side"
      style={{ scrollBehavior: "smooth", scrollPaddingTop: "5rem" }}
    >
      <label htmlFor="drawer" className="drawer-overlay" />
      <aside className="bg-base-200 w-80">
        <div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex ">
          <Link          
              href="/"
          >
          <a
            aria-current="page"
            aria-label="Homepage"
            className="flex-0 btn btn-ghost px-2"
          >
            <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
              <span className="lowercase">daisy</span>
              <span className="text-base-content uppercase">UI</span>
            </div>
          </a>
          </Link>
          <a
            href="/docs/changelog"
            className="link link-hover font-mono text-xs text-opacity-50"
          >
            <div data-tip="Changelog" className="tooltip tooltip-bottom">
              2.38.0
            </div>
          </a>
        </div>
        <div className="h-4" />
        <ul className="menu menu-compact flex flex-col p-0 px-4">
          
          <li>
            <a
             
              href="/docs/install"
              id=""
              className="flex gap-4   "
            >
              <span className="flex-none">
                <svg
                  width={24}
                  height={24}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                  />
                </svg>
              </span>
              <span className="flex-1">Install</span>
            </a>
          </li>

        </ul>
        <ul className="menu menu-compact flex flex-col p-0 px-4">
          <li />
          <li className="menu-title">
            <span>Actions</span>
          </li>
          <li>
                <a href="/components/button" id="" className="flex gap-4   ">
                  
                  <span className="flex-1">Button</span>
                </a>
              </li>
        </ul>
        <ul className="menu menu-compact flex flex-col p-0 px-4"></ul>
        <div className="from-base-200 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent" />
      </aside>
    </div>
  </div>
  
 
</>

    </>
  );
};

export default Test2;

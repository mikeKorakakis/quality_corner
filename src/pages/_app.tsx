// src/pages/_app.tsx
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-datepicker/dist/react-datepicker.css";

import { trpc } from "../utils/trpc";
import { useLibraryStore } from "@/core/stores/libraryStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const state = useLibraryStore();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    try {
      typeof theme === "string" &&
        document.body.setAttribute("data-theme", JSON.parse(theme));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchLibraries = async () => {
    const res = await fetch("/api/read_libraries");
    const data = await res.json();
    return data;
  };

  useQuery(["read_libraries"], fetchLibraries, {
    onSuccess(data) {
      state.setLibraries(data);
    },
  });

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" pauseOnHover />
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

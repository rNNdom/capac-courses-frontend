import { NextPage } from "next";
import "../styles/globals.css";
import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import Layout from "./Layout";

export type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode };
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

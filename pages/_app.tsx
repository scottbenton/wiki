import Head from "next/head";
import React from "react";
import "styles/globals.css";
import { initializeApp } from "lib/firebase";
import { AppProviders } from "providers";
import "@fontsource/inter/variable.css";

initializeApp();

export interface MyAppProps {
  Component: new () => React.Component<any>;
  pageProps: Object;
}

const MyApp: React.FC<MyAppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Willo</title>
        <link rel="icon" href="/favicon.ico" sizes={"any"} />
        <link rel="icon" href="/icon.svg" type={"image/svg+xml"} />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="manifest" href={"/manifest.webmanifest"} />
        <meta name="author" content="Scott Benton" />
      </Head>
      <AppProviders>
        <div className="antialiased font-body text-gray-900 min-h-screen bg-gray-200">
          <Component {...pageProps} />
        </div>
      </AppProviders>
    </>
  );
};

export default MyApp;

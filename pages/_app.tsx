import React from "react";
import "styles/globals.css";
import { initializeApp } from "lib/firebase";
import { AppProviders } from "providers";
import "typeface-inter";
import "typeface-quicksand";

initializeApp();

export interface MyAppProps {
  Component: new () => React.Component<any>;
  pageProps: Object;
}

const MyApp: React.FC<MyAppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <AppProviders>
      <div className="antialiased font-body text-gray-900 min-h-screen bg-primary-600">
        <Component {...pageProps} />
      </div>
    </AppProviders>
  );
};

export default MyApp;

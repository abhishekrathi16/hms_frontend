import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useState } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

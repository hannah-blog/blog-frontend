import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@material-tailwind/react";
import Head from "next/head";
import Navbar from "../components/layout/Navbar";
import styles from "../styles/Home.module.css";
import Footer from "../components/layout/Footer";
import { PortfolioProvider } from "../context/context";
import { prefix } from "../config/config";
import { DefaultSeo } from "next-seo";
import SEO from "../seo.config";

export default function App({ Component, pageProps }: AppProps) {
  return <PortfolioProvider value={{ prefix }}>
    <ThemeProvider>
      <DefaultSeo {...SEO} />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sacramento" />
      <Navbar />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  </PortfolioProvider>
}

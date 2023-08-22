import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '@material-tailwind/react';
import Navbar from '../components/layout/Navbar';
import styles from '../styles/Home.module.css';
import Footer from '../components/layout/Footer';

export default function App({Component, pageProps}: AppProps) {
  return <ThemeProvider>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sacramento"/>
    <Navbar/>
    <main className={styles.main}>
      <Component {...pageProps} />
    </main>
    <Footer/>
  </ThemeProvider>;
}

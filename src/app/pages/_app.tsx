import '../styles/globals.css';
import type { AppProps } from 'next/app';

function DocDoc({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default DocDoc;

import '../styles/global.css';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Providers from '../hooks/index';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;

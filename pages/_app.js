import '../styles/tailwind.css';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Slide, ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

const ReactTooltip = dynamic(() => import('react-tooltip'), { ssr: false });

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Time Enna - Timezone Converter</title>
      <meta
        name="description"
        content="Time Enna is an app to help you look up the time across multiple timezones, a simple but helpful utility for the remote world."
      />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>

    <ReactTooltip />
    <ToastContainer
      hideProgressBar
      transition={Slide}
      closeButton={false}
      position="bottom-center"
    />
  </>
);

export default MyApp;

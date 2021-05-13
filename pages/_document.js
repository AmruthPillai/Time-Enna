import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Time Enna" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Time Enna" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#111111" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#111111" />

          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/icons/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="256x256"
            href="/icons/icon-256x256.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="384x384"
            href="/icons/icon-384x384.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/icon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/icon-32x32.png"
          />
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="mask-icon" href="/icons/icon-16x16.svg" color="#111111" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta
            name="twitter:card"
            content="Time Enna is an app to help you look up the time across multiple timezones, a simple but helpful utility for the remote world."
          />
          <meta name="twitter:url" content="https://timeenna.com" />
          <meta name="twitter:title" content="Time Enna" />
          <meta
            name="twitter:description"
            content="Time Enna is an app to help you look up the time across multiple timezones, a simple but helpful utility for the remote world."
          />
          <meta
            name="twitter:image"
            content="https://timeenna.com/icons/logo-256x256.png"
          />
          <meta name="twitter:creator" content="@KingOKings" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Time Enna" />
          <meta
            property="og:description"
            content="Time Enna is an app to help you look up the time across multiple timezones, a simple but helpful utility for the remote world."
          />
          <meta property="og:site_name" content="Time Enna" />
          <meta property="og:url" content="https://timeenna.com" />
          <meta
            property="og:image"
            content="https://timeenna.com/icons/logo-256x256.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

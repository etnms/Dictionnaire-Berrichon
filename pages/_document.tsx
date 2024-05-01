import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2LZ05VKQM8"
        ></script>
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());

     gtag('config', 'G-2LZ05VKQM8');
   `,
          }}
        ></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="dictionnaire, berrichon, dictionnaire en ligne, dictionnaire berrichon en ligne, francais, français, dictionnaire berrichon, en ligne, dictionnaire berrichon français, patois, patois berrichon, parler berrichon, dico berrichon, dico, france,
          Berry, berry, dictionnarie berry, glossaire, glossaire berrichon, lexique, lexique berrichon"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

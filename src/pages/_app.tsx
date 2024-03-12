import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../../layout";
import { AppContextProvider } from "../../context/app.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider currentPlayerId={null} players={[]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

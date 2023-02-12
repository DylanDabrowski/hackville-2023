import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Josefin_Sans } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const jose = Josefin_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={jose.className}>
      <Component {...pageProps} />
    </main>
  );
}

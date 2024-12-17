import type { Metadata } from "next";
import { Work_Sans, Raleway } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "model.eval",
  description:
    "Avalie o desempenho do seu modelo Flan/T5 na geração de questões educacionais com rapidez e simplicidade. Ferramenta prática para análise e aprimoramento de modelos de linguagem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${workSans.variable} ${raleway.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

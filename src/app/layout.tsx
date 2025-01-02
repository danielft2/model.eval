import type { Metadata } from "next";
import { Raleway, Work_Sans } from "next/font/google";
import { Toaster } from "sonner";
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
        <Toaster
          className="-tracking-wider font-heading"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: "flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 border min-w-[365px]",
              title: "text-slate-800 text-sm",
              description: "text-slate-600 text-sm",
              icon: "text-slate-800",
              actionButton:
               `border border-brand-800 whitespace-nowrap text-sm text-brand-800 
                rounded-md h-[32px] px-3 hover:bg-brand-800 hover:text-white transition-colors`,
            },
          }}
        />
      </body>
    </html>
  );
}

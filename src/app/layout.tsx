import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import 'suneditor/dist/css/suneditor.min.css'
import { SideBar } from "@/components/sidebar";
import { ClientGlobalProvider } from "@/providers";

//adicionar fonte montserrat do google fonts do next

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desafio Suprema",
  description: "CMS desenvolvido para o desafio da Suprema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${montserrat.className} antialiased`}>
        <ClientGlobalProvider>
          <SideBar />
          {children}
        </ClientGlobalProvider>
      </body>
    </html>
  );
}

export const revalidate = 1;
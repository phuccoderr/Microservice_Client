import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/utils/providers";
import { Toaster } from "react-hot-toast";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Next App",
  description: "create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>{children}</Provider>
        </ThemeProvider>
        <Toaster />
        <ToasterSonner
          richColors
          expand={false}
          toastOptions={{ classNames: { loading: "bg-white text-black" } }}
        />
      </body>
    </html>
  );
}

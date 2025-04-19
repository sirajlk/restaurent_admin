import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import { LoadingProvider } from "@/providers/LoadingProvider";
import GlobalLoading from "@/components/global-loading"; // ✅ updated import
import RouteLoadingTrigger from "@/components/route-loading-trigger"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <LoadingProvider>
            <GlobalLoading />
            <RouteLoadingTrigger /> {/* 👈 Add this line */}
            {children}
            <Toaster />
          </LoadingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

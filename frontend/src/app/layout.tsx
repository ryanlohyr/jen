import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

import { Analytics } from "@vercel/analytics/react";

import { Providers } from "@/lib/providers";

import { HandleLogin } from "@/features/auth";
import AuthPopupComponent from "@/features/auth/components/AuthPopupComponent";
import Banner from "@/features/banner/Banner";
import { Navbar } from "@/features/navbar";

import "./globals.css";
import { environmentConfig } from "@/environments/config";

const inter = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jouvire",
  description: "The only wedding planner you'll ever need.",
  icons: {
    icon: "./jouvireLogo.svg",
  },
};

const trackingId = environmentConfig.googleAnaylticsTrackingId;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <head>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
          />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${trackingId}');
            `}
          </Script>
        </head>

        <body
          suppressHydrationWarning
          className={`${inter.className} overflow-x-hidden w-[100vw]`}
        >
          <Banner />
          <div className="flex  flex-col lg:flex-row">
            <Toaster
              richColors
              position="bottom-right"
              expand={false}
              closeButton
            />

            <HandleLogin />
            <Navbar />
            <div className="w-full font-worksans">
              <div>
                {children}
                <Analytics />
                <AuthPopupComponent />
              </div>
            </div>
          </div>
        </body>
      </html>
    </Providers>
  );
}

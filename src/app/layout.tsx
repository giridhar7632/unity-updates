import "~/styles/globals.css";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { Metadata, Viewport } from "next";
import { Icons } from "~/components/Icons";
import { ThemeProvider } from "~/components/theme-provider";
import Header from "~/components/header";
import { Toaster } from "~/components/ui/toaster";

const font = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const APP_NAME = "Unity Updates";
const APP_DEFAULT_TITLE = "Unity Updates";
const APP_TITLE_TEMPLATE = "%s - Haitis Unity Updates";
const APP_DESCRIPTION = "Be united and safe!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${font.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="mx-auto mb-[100px] w-full max-w-4xl overflow-y-auto overflow-x-hidden px-4 md:px-8">
            {children}
          </div>
          <Toaster />
          <footer className="z-100 fixed bottom-0 h-[80px] w-full border-t border-border/40 bg-background/95 p-4 text-primary backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="mx-auto flex max-w-2xl justify-between">
              <Link className="flex flex-col items-center" href="/">
                <Icons.home className="h-6 w-6" />
                <div className="mt-1 text-center text-xs leading-3">Home</div>
              </Link>

              <Link className="flex flex-col items-center" href="/map">
                <Icons.map className="h-6 w-6" />
                <div className="mt-1 text-center text-xs leading-3">Map</div>
              </Link>

              <Link className="flex flex-col items-center" href="/report">
                <Icons.report className="h-6 w-6" />
                <div className="mt-1 text-center text-xs leading-3">Report</div>
              </Link>
            </nav>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

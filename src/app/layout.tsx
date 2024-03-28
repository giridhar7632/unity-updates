import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import { Metadata, Viewport } from "next";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Icons } from "~/components/Icons";

const font = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const APP_NAME = "Unity Updates";
const APP_DEFAULT_TITLE = "Unity Updates";
const APP_TITLE_TEMPLATE = "%s - Haitis";
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
      <body className={`${font.className}`}>
        <div className="h-4/5">{children}</div>
        <div className="fixed h-1/5 w-full p-8 text-primary">
          {/*Footer*/}
          <div className="flex h-full cursor-pointer flex-row items-center justify-evenly rounded-2xl border-4 border-black">
            <Link href="/">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Icons.home className="h-8 w-8" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Home</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
            <Link href="/map">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Icons.map className="h-8 w-8" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Map</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
            <Link href="/report">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Icons.report className="h-8 w-8" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Report</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

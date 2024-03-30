import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import { Metadata, Viewport } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import Header from "~/components/header";
import { Toaster } from "~/components/ui/toaster";
import Footer from "~/components/footer";
// import Push from "~/components/push";

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
          <div className="mx-auto mb-[100px] w-full max-w-4xl overflow-x-hidden px-4 md:px-8">
            {children}
          </div>
          <Toaster />
          <Footer />
          {/* <Push /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

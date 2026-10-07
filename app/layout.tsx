import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Dancing_Script,
  Plus_Jakarta_Sans,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-cormorant",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  variable: "--font-dancing",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gửi em — Một món quà nhỏ cho ngày 20/10",
  description: "Một chiếc thiệp nhỏ dành riêng cho người anh thương.",
  keywords: [
    "thiệp 20/10 người yêu",
    "thiệp 20/10 tặng bạn gái",
    "ngày phụ nữ việt nam",
    "lời chúc 20/10 ngọt ngào",
    "món quà 20/10 cho người yêu",
  ],
  authors: [{ name: "Gửi Người Anh Yêu" }],
  openGraph: {
    title: "Gửi em — Một món quà nhỏ cho ngày 20/10",
    description: "Một chiếc thiệp nhỏ dành riêng cho người anh thương.",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gửi em — Một món quà nhỏ cho ngày 20/10",
    description: "Một chiếc thiệp nhỏ dành riêng cho người anh thương.",
  },
};

export const viewport: Viewport = {
  themeColor: "#23060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${jakarta.variable} ${playfair.variable} ${cormorant.variable} ${dancing.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body className="min-h-screen font-sans bg-[#FAF7F5] text-[#2D2426] antialiased selection:bg-rose-200 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}

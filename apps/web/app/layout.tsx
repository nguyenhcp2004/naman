import { Geist_Mono } from "next/font/google"
import localFont from "next/font/local"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"

const avo = localFont({
  src: [
    {
      path: "../public/fonts/UTM-Avo.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/UTM-AvoItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/UTM-AvoBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/UTM-AvoBold_Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, avo.variable, "font-sans")}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

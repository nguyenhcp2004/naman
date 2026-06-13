import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import localFont from "next/font/local"

import "@workspace/ui/globals.css"
import { SiteFooter, SiteHeader } from "@/components/layout"
import { ThemeProvider } from "@/components/theme-provider"
import { sanityFetch } from "@/sanity/lib/client"
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries"
import type { SiteSettings } from "@/sanity/types"
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY })

  return {
    title: settings?.seo?.title ?? settings?.siteTitle ?? "QMaster",
    description: settings?.seo?.description ?? "QMaster operational workflows for projects, services, and company teams.",
    robots: settings?.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, avo.variable, "font-sans")}
    >
      <body>
        <ThemeProvider>
          <div className="flex min-h-svh flex-col bg-background text-foreground">
            <SiteHeader />
            <main className="flex-1 pb-28 md:pb-36">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import clsx from "clsx";
import Preloader from "@/components/preloader";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prajyot Tayde | Full Stack Developer Portfolio",
  description:
    "Explore the professional portfolio of Prajyot Tayde, a skilled full stack web developer and software engineer specializing in modern web technologies, custom web apps, and scalable software solutions.",
  keywords: [
    "Prajyot Tayde",
    "web developer portfolio",
    "software developer portfolio",
    "full stack developer",
    "frontend developer",
    "backend developer",
    "JavaScript developer",
    "React developer",
    "Next.js developer",
    "software engineer",
    "freelance developer",
    "custom web development",
  ].join(", "),
  authors: [{ name: "Prajyot Tayde", url: "https://projo.dev" }],
  openGraph: {
    title: "Prajyot Tayde | Full Stack Developer",
    description:
      "Visit the portfolio of Prajyot Tayde, showcasing web development projects, software engineering skills, and technical expertise in full stack development.",
    url: "https://projo.dev",
    type: "website",
    siteName: "Prajyot Tayde Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prajyot Tayde | Full Stack Web Developer",
    description:
      "Showcasing the work and projects of Prajyot Tayde, a passionate full stack software developer.",
    creator: "https://x.com/Prajyot_Tayde",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-slate-900 text-slate-100 max-w-screen overflow-x-hidden"
    >
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <Preloader />
        <Header />
        {children}
        <Footer />
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
      </body>
    </html>
  );
}

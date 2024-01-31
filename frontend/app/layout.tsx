import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Resume Analyzer",
  description: "A resume analyzer to match resumes to job descriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}

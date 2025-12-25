import { icons } from "lucide-react";
import "./globals.css";

export const metadata = {
  title: "Developer",
  description: "Building the future of web development",
  // icons: { icon: "/terminal_favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

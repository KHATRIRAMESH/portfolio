import "./globals.css";

export const metadata = {
  title: "I'm Ramesh Khatri",
  keywords:
    "web developer, portfolio, projects, skills, JavaScript, React, web design, frontend development, backend development, full-stack developer, coding, programming, software development, tech stack, resume, contact, NestJS, NextJS, NodeJS, ExpressJS, MongoDB, SQL, HTML, CSS, TailwindCSS, Git, GitHub, RESTful APIs, GraphQL, TypeScript, Redux, Zustand",
  author: "Ramesh Khatri",
  description: "Building the future of web development",
  icons: {
    icon: "/favicon.ico",
  },
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

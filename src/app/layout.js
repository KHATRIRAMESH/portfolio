import "./globals.css";

export const metadata = {
    title: 'Developers',
    description: 'Building the future of web development',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}

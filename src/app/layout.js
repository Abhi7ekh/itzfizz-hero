import "./globals.css";

export const metadata = {
  title: "ITZFIZZ Hero",
  description: "ITZFIZZ scroll-driven hero animation assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

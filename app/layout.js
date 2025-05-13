import "./globals.css";

export const metadata = {
  title: "Kanban Board",
  description: "A simple kanban board with drag and drop functionality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

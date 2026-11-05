import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo projekt",
  description: "Prosta aplikacja CRUD do zarządzania zadaniami",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}

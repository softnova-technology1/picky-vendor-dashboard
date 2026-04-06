import "./globals.css";

export const metadata = {
  title: {
    default: "Picky Vendor",
    template: "%s | Picky Vendor",
  },
  description: "Elite Merchant Picky Vendor Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="scrollbar-hide" suppressHydrationWarning>{children}</body>
    </html>
  );
}

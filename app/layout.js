import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import SideNav from "./ui/sidenav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bitcoin wallet",
  description: "A small bitcoin wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div>{children}</div>
          <div>
            <SideNav />
          </div>
        </body>
      </UserProvider>
    </html>
  );
}

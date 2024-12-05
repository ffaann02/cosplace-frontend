export const runtime = "edge";
import type { Metadata } from "next";
import "../styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/components/layout/navbar";
import { ConfigProvider } from "antd";
import { antTheme } from "@/config/theme";
// import { AuthProvider } from "@/context/auth-context";
import Loading from "@/components/loading";
import { Suspense } from "react";
import BottomMenu from "@/components/layout/bottom-menu";
import Footer from "@/components/layout/footer";
import ChatButton from "@/components/popup/chat/chat-button";
import getServerSession from "next-auth";
import SessionProvider from "@/context/session-provider";
import { auth } from "@/libs/auth";
import { AuthProvider } from "@/context/auth-context";
import { ChatProvider } from "@/context/chat-context";
import { NotificationProvider } from "@/context/notification-context";

export const metadata: Metadata = {
  title: "CosBaanDeawGun",
  description: "ทุกอย่างที่เกี่ยวกับคอสเพลย์จบในเว็บไซต์เดียว",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-Kanit bg-white relative">
        <ConfigProvider theme={antTheme}>
          <AntdRegistry>
            <Suspense fallback={<Loading />}>
              <AuthProvider>
                <ChatProvider>
                  <NotificationProvider>
                    <Navbar />
                    <div className="flex flex-col min-h-dvh z-0 pt-16">
                      {children}
                    </div>
                    {/* <ChatButton /> */}
                    <BottomMenu />
                  </NotificationProvider>
                </ChatProvider>
              </AuthProvider>
            </Suspense>
          </AntdRegistry>
        </ConfigProvider>
        <Footer />
      </body>
    </html>
  );
}

import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { Viewport } from "next";
import "boxicons/css/boxicons.min.css";
import "@styles/globals.scss";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorTextPlaceholder: "#666668",
              colorText: "#3D3D3D",
            },
            components: {
              Input: {
                paddingInline: 0,
              },
              Button: {
                paddingBlockSM: 0,
              },
            },
          }}
        >
          <main className="flex flex-col">{children}</main>
        </ConfigProvider>
      </body>
    </html>
  );
}

type Props = {
  children: ReactNode;
};

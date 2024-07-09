import React, { ReactNode } from "react";
import { Header } from "@components/Header/Header";
import { Footer } from "@components/Footer/Footer";
import { ConfigProvider } from "antd";
import "boxicons/css/boxicons.min.css";

import "@styles/globals.scss";

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
          <main className="custom-light main-container">
            <Header />
            {children}
            <Footer />
          </main>
        </ConfigProvider>
      </body>
    </html>
  );
}

type Props = {
  children: ReactNode;
};

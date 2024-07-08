import React, { ReactNode } from "react";
import { Header } from "@components/Header/Header";
import "boxicons/css/boxicons.min.css";

import "@styles/globals.scss";
import { Footer } from "@components/Footer/Footer";
import { ConfigProvider } from "antd";

export default function RootLayout({ children }: Props) {
  return (
    <html className="full-place" lang="en">
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
                controlHeightSM: 16,
              },
            },
          }}
        >
          <main className="custom-light full-place main-container">
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

import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";
import "boxicons/css/boxicons.min.css";

import "@styles/globals.scss";

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
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
          <main className="main-container">{children}</main>
        </ConfigProvider>
      </body>
    </html>
  );
}

type Props = {
  children: ReactNode;
};

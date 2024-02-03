import { AntdRegistry } from "@ant-design/nextjs-registry";
import Nav from "@components/Nav";
import Providers from "@components/Providers";
import "@styles/globals.css";

export const metadata = {
  title: "VitaSoft Solutions",
  description: "This a task given by VitaSoft Solutions",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="main">
            <div className="gradient" />
          </div>
          <AntdRegistry>
            <main className="app">
              <Nav />
              {children}
            </main>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

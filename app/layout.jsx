import "@styles/globals.css";
import Providers from "@components/Providers";
import Nav from "@components/Nav";

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
          <main className="app">
            <Nav />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

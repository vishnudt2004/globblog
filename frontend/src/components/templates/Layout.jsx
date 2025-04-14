// Node module Imports
import { Outlet } from "react-router-dom";

import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";

function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;

// Node module Imports
import { Outlet } from "react-router-dom";

import {
  // Organisms
  Footer,
  Header,
} from "../../config/exports";

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

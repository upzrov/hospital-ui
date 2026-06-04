import { Outlet } from "react-router";
import Header from "~/components/Header/Header";
import { Footer } from "~/components/Footer/Footer";
import { useOutletContext } from "react-router";
import type { Role } from "~/types/auth";

export default function Layout() {
  const context = useOutletContext();

  return (
    <>
      <Header />

      <main>
        <Outlet context={context} />
      </main>

      <Footer />
    </>
  );
}

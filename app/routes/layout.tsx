import { Outlet, useOutletContext } from 'react-router';
import { Footer } from '~/components/Footer';
import Header from '~/components/Header';

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

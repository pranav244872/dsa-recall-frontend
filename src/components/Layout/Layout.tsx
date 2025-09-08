import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      {/* The Outlet component is a placeholder that renders the matched child route */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

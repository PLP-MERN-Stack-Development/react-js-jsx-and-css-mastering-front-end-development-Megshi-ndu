import Navbar from './Navbar';
import Footer from './Footer';

import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren<{}>) => (
  <div className="flex flex-col min-h-screen">
    <Navbar currentView={'tasks'} onViewChange={function (view: 'tasks' | 'api'): void {
      throw new Error('Function not implemented.');
    } }
    />
    <main className="flex-grow p-4">{children}</main>
    <Footer />
  </div>
);

export default Layout;
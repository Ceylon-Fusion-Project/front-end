import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 z-50`}
    >
      <div className="p-5 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-xl font-bold">CEYLON FUSION</h1>
        
        <button className="lg:hidden" onClick={toggleSidebar}>
          <X size={24} />
        </button>
      </div>
      <nav className="p-5">
        <ul className="space-y-4">
          <li><Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
          <li><Link to="/admin/origins" className="hover:text-gray-300">Origin Management</Link></li>
          <li><Link to="/admin/certifications" className="hover:text-gray-300">Certifications</Link></li>
          <li><Link to="/admin/booking management" className="hover:text-gray-300">Booking Management</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button className="lg:hidden" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </header>
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
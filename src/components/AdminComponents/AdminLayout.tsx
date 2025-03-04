import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LayoutDashboard, MapPin, BadgeCheck, CalendarCheck } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gradient-to-br from-[#8B4513] to-[#A0522D] text-white w-72 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 z-50 shadow-lg`}
    >
      <div className="p-6 flex justify-between items-center border-b border-[#704214]">
        <h1 className="text-2xl font-extrabold tracking-wider">CEYLON FUSION</h1>
        <button className="lg:hidden" onClick={toggleSidebar}>
          <X size={28} className="text-[#D2691E] hover:text-white" />
        </button>
      </div>
      <nav className="p-6">
        <ul className="space-y-6">
          <li>
            <Link to="/admin/dashboard" className="flex items-center space-x-3 text-lg text-white hover:text-[#D2691E] transition-all">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/origins" className="flex items-center space-x-3 text-lg text-white hover:text-[#D2691E] transition-all">
              <MapPin size={20} />
              <span>Origin Management</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/certifications" className="flex items-center space-x-3 text-lg text-white hover:text-[#D2691E] transition-all">
              <BadgeCheck size={20} />
              <span>Certifications</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/booking management" className="flex items-center space-x-3 text-lg text-white hover:text-[#D2691E] transition-all">
              <CalendarCheck size={20} />
              <span>Booking Management</span>
            </Link>
          </li>
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
    <div className="flex min-h-screen bg-[#F5DEB3]">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button className="lg:hidden" onClick={toggleSidebar}>
            <Menu size={28} className="text-[#8B4513]" />
          </button>
          <h2 className="text-xl font-semibold text-[#8B4513]">Admin Dashboard</h2>
        </header>
        <main className="p-8 flex-1 bg-white rounded-lg shadow-inner">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

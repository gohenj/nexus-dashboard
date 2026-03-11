import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, ArrowDownCircle, ArrowUpCircle, RefreshCcw, LogOut } from 'lucide-react';

export default function Layout() {
  const menuItems = [
    { path: '/home', label: 'Home', icon: LayoutDashboard },
    { path: '/usuarios', label: 'Usuários', icon: Users },
    { path: '/deposito', label: 'Depósito', icon: ArrowDownCircle },
    { path: '/saque', label: 'Saque', icon: ArrowUpCircle },
    { path: '/conversao', label: 'Conversão', icon: RefreshCcw },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Nexus</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <NavLink to="/" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Sair
          </NavLink>
        </div>
      </aside>


      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center p-2 z-50">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
    </div>
  );
}
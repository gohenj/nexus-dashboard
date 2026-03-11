import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, ArrowDownCircle, ArrowUpCircle, RefreshCcw, LogOut, Moon, Sun } from 'lucide-react';

export default function Layout() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
    setIsDark(!isDark);
  };

  const menuItems = [
    { path: '/home', label: 'Home', icon: LayoutDashboard },
    { path: '/usuarios', label: 'Usuários', icon: Users },
    { path: '/deposito', label: 'Depósito', icon: ArrowDownCircle },
    { path: '/saque', label: 'Saque', icon: ArrowUpCircle },
    { path: '/conversao', label: 'Conversão', icon: RefreshCcw },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 transition-colors overflow-hidden">
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transition-colors">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Nexus</span>
          </div>
          <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
          <NavLink to="/" className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Sair
          </NavLink>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="md:hidden flex justify-end p-4">
          <button onClick={toggleTheme} className="p-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 flex justify-around items-center p-2 z-50 transition-colors">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400'
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
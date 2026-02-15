
import React from 'react';
import { LayoutGrid, Sparkles, Image as ImageIcon, Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentView: string;
  onChangeView: (view: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onChangeView, searchQuery, onSearch }) => {
  const navItems = [
    { id: 'dashboard', label: 'ابزارها', icon: LayoutGrid },
    { id: 'magic-studio', label: 'گالری', icon: ImageIcon },
  ];

  return (
    <header className="h-20 border-b border-white/5 bg-space-950/80 backdrop-blur-xl sticky top-0 z-40 px-6 md:px-8 flex items-center justify-between shadow-sm">
      
      {/* Right: Logo */}
      <div className="flex items-center gap-3 select-none min-w-[200px]">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-electric-blue to-electric-purple flex items-center justify-center shadow-lg shadow-electric-blue/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg tracking-tight text-white leading-none">پرامپت استودیو</h1>
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">دستیار هوشمند</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full group">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-gray-600 group-focus-within:text-electric-blue transition-colors" />
            </div>
            <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="جستجو در ابزارها یا پرامپت‌ها..." 
                className="block w-full h-10 pr-10 pl-4 rounded-lg bg-space-900/50 border border-white/10 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-white/20 focus:bg-space-900 transition-all"
            />
        </div>
      </div>

      {/* Left: Navigation Tabs */}
      <div className="flex items-center gap-4 min-w-[200px] justify-end">
        <nav className="flex items-center p-1 rounded-lg bg-space-900 border border-white/5">
          {navItems.map((item) => {
            const isActive = currentView === item.id || (item.id === 'dashboard' && currentView === 'tool-workspace');
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`
                  relative px-4 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold transition-all duration-200
                  ${isActive ? 'text-white bg-white/10 shadow-sm' : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                <item.icon className={`w-3.5 h-3.5 ${isActive ? 'text-electric-blue' : 'text-current'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;

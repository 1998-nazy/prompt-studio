
import React from 'react';
import { LayoutGrid, Sparkles, Wand2 } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutGrid },
    { id: 'magic-studio', label: 'مجیک استودیو', icon: Wand2 },
  ];

  return (
    <aside className="w-64 h-screen fixed right-0 top-0 bg-space-900 border-l border-white/5 flex flex-col z-40 hidden lg:flex">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-white/5 gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-electric-blue to-electric-purple flex items-center justify-center shadow-lg shadow-electric-blue/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">پرامپت استودیو</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">دستیار هوشمند</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2">
        <p className="px-4 text-xs font-bold text-gray-500 mb-4">منوی اصلی</p>
        {menuItems.map((item) => {
          // Highlight dashboard when on dashboard or inside a tool workspace
          const isActive = currentView === item.id || (item.id === 'dashboard' && currentView === 'tool-workspace');
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-electric-blue/10 text-electric-blue shadow-[inset_0_0_10px_rgba(0,212,255,0.1)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-electric-blue' : 'text-gray-500 group-hover:text-white'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && <div className="mr-auto w-1.5 h-1.5 rounded-full bg-electric-blue shadow-[0_0_8px_#00d4ff]"></div>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

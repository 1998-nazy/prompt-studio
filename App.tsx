
import React, { useState } from 'react';
import StarField from './components/StarField';
import Header from './components/Header';
import DashboardHome from './components/DashboardHome';
import ToolWorkspace from './components/ToolWorkspace';
import MagicStudio from './components/MagicStudio';
import { Tool } from './types';

const TOOLS: Tool[] = [
  {
    id: 'text-refiner',
    title: 'متن به متن',
    description: 'تبدیل ایده‌های خام به پرامپت‌های انگلیسی سینمایی و حرفه‌ای',
    iconName: 'Sparkles',
    gradient: 'from-blue-600 to-indigo-600',
    accentColor: '#00d4ff'
  },
  {
    id: 'visual-describer',
    title: 'تصویر به متن',
    description: 'مهندسی معکوس تصاویر برای استخراج سبک و جزئیات بصری',
    iconName: 'ScanEye',
    gradient: 'from-cyan-600 to-blue-600',
    accentColor: '#00fff7'
  },
  {
    id: 'character',
    title: 'ثبات چهره',
    description: 'خلق کاراکترهای ثابت با حفظ ویژگی‌های بیومتریک',
    iconName: 'ScanFace',
    gradient: 'from-indigo-600 to-purple-600',
    accentColor: '#b030ff'
  },
  {
    id: 'stylist',
    title: 'دستیار مد',
    description: 'شبیه‌سازی حرفه‌ای استایل و لباس روی مدل‌های انسانی',
    iconName: 'Palette',
    gradient: 'from-blue-500 to-cyan-500',
    accentColor: '#00d4ff'
  },
  {
    id: 'smart-editor',
    title: 'ویرایش جادویی',
    description: 'اصلاح و بازسازی بخش‌های خاص تصویر',
    iconName: 'Wand2',
    gradient: 'from-violet-600 to-indigo-500',
    accentColor: '#818cf8'
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
    setCurrentView('tool-workspace'); 
    setSearchQuery(''); // Clear search on selection
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    if (view === 'dashboard') {
      setSelectedTool(null);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-space-950 text-white font-sans overflow-hidden dir-rtl">
      <StarField />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-grid z-0 pointer-events-none opacity-[0.05]"></div>
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Navigation */}
      <Header 
        currentView={currentView} 
        onChangeView={handleViewChange} 
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-space-950/30">
           {currentView === 'dashboard' && (
             <DashboardHome 
                tools={TOOLS} 
                onSelectTool={handleToolSelect} 
                onViewGallery={() => handleViewChange('magic-studio')}
                searchQuery={searchQuery}
             />
           )}

           {currentView === 'tool-workspace' && selectedTool && (
             <ToolWorkspace 
               tool={selectedTool} 
               onBack={() => {
                   setSelectedTool(null);
                   setCurrentView('dashboard');
               }} 
             />
           )}

           {currentView === 'magic-studio' && (
             <MagicStudio searchQuery={searchQuery} />
           )}
        </main>
      </div>
    </div>
  );
};

export default App;

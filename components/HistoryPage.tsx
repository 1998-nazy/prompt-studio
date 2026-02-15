import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Copy, CheckCircle, Sparkles, Search, Filter, Calendar, ChevronLeft, ArrowRight, CornerDownLeft, X } from 'lucide-react';

// Mock Data
const HISTORY_ITEMS = [
  {
    id: 1,
    toolId: 'text-refiner',
    toolName: 'متن به متن',
    icon: Sparkles,
    date: 'لحظاتی پیش',
    input: 'یک کافه دنج در خیابان‌های پاریس زیر باران پاییزی با نورهای گرم و انعکاس روی سنگفرش',
    output: 'Cinematic wide shot of a cozy Parisian cafe corner during autumn rain, wet cobblestone streets reflecting warm yellow interior lights, fallen orange leaves, melancholic yet cozy atmosphere, photorealistic, 8k resolution, volumetric fog, street photography.',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    accent: 'text-electric-blue'
  },
  {
    id: 2,
    toolId: 'character',
    toolName: 'ثبات چهره',
    icon: Sparkles,
    date: '۱۵ دقیقه پیش',
    input: 'تصویر پرتره یک فضانورد زن جوان با کلاه ایمنی باز و پس‌زمینه کهکشان',
    output: 'Close-up portrait of a young female astronaut with open helmet visor, reflection of nebula in eyes, detailed skin texture, biometric fidelity, galactic background with stars and nebula, soft rim lighting, sci-fi aesthetic, highly detailed.',
    gradient: 'from-purple-600 via-violet-500 to-pink-500',
    accent: 'text-electric-purple'
  },
  {
    id: 3,
    toolId: 'visual-describer',
    toolName: 'تصویر به متن',
    icon: Sparkles,
    date: '۱ ساعت پیش',
    input: 'تحلیل سبک معماری تصویر آپلود شده برای بازسازی در پروژه جدید',
    output: 'Architectural photography analysis: Modern brutalist structure with raw concrete textures, dramatic geometric shadows, incorporation of vertical gardens, overcast lighting, minimalist composition, architectural digest style.',
    gradient: 'from-emerald-500 via-teal-500 to-blue-500',
    accent: 'text-electric-cyan'
  },
  {
    id: 4,
    toolId: 'stylist',
    toolName: 'دستیار مد',
    icon: Sparkles,
    date: '۳ ساعت پیش',
    input: 'طراحی لباس برای کالکشن تابستانی با تم دریا و رنگ‌های پاستلی',
    output: 'Fashion editorial shot, summer collection featuring flowing silk dresses in pastel ocean gradients (teal, foam white, coral pink), beach setting at sunset, soft wind movement, high fashion pose, natural lighting, vogue magazine style.',
    gradient: 'from-pink-600 via-rose-500 to-orange-400',
    accent: 'text-electric-pink'
  }
];

const RELATED_ACTIVITY_MOCK = [
    { id: 101, date: 'دیروز، ۱۰:۳۰', input: 'طراحی کانسپت ماشین پرنده با استایل رترو فیوچریسم...' },
    { id: 102, date: 'دیروز، ۱۴:۲۰', input: 'پرتره کلاسیک با نورپردازی رامبراند و بافت قدیمی...' },
    { id: 103, date: '۲ روز پیش', input: 'فضای داخلی با سبک مینیمال ژاپنی و نور طبیعی...' },
];

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 160,
  damping: 24,
  mass: 1.1
};

export const HistoryPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const selectedItem = HISTORY_ITEMS.find(item => item.id === selectedId);

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto min-h-full relative pb-20">
      {/* Header with Fade Out on Select */}
      <motion.div 
        animate={{ opacity: selectedId ? 0 : 1, y: selectedId ? -20 : 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
      >
        <div>
          <h2 className="text-3xl font-black text-white mb-3 flex items-center gap-3">
            <Clock className="w-8 h-8 text-electric-blue" />
            تاریخچه فعالیت‌ها
          </h2>
          <p className="text-gray-400 text-lg">مرور و مدیریت تمام پرامپت‌های تولید شده</p>
        </div>
        
        <div className="flex items-center gap-3 bg-space-900/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="جستجو..." 
              className="bg-transparent border-none outline-none text-white text-sm w-48 pr-9 pl-4 h-10 placeholder-gray-600"
            />
          </div>
          <div className="w-[1px] h-6 bg-white/10"></div>
          <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* List Container */}
      <div className="flex flex-col gap-4 relative">
        {HISTORY_ITEMS.map((item) => (
          <div key={item.id} className="relative h-[110px]"> 
            {/* The List Item Card */}
            <motion.div
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className="absolute inset-0 bg-space-900/60 border border-white/5 rounded-[2rem] hover:border-white/15 hover:bg-space-800/80 cursor-pointer overflow-hidden backdrop-blur-sm z-10"
              style={{ borderRadius: '2rem' }}
              animate={{ 
                opacity: selectedId === item.id ? 0 : (selectedId ? 0.3 : 1),
                scale: selectedId && selectedId !== item.id ? 0.98 : 1,
                filter: selectedId && selectedId !== item.id ? 'blur(4px)' : 'none'
              }}
              transition={SPRING_TRANSITION}
            >
                <div className="flex items-center h-full px-8 gap-6">
                    {/* Icon */}
                    <motion.div 
                        layoutId={`icon-${item.id}`} 
                        className={`p-3.5 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg shadow-black/20`}
                    >
                        <item.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Text Info */}
                    <div className="flex flex-col min-w-[150px]">
                        <motion.h3 layoutId={`title-${item.id}`} className="font-bold text-white text-lg tracking-tight">
                            {item.toolName}
                        </motion.h3>
                        <motion.span layoutId={`date-${item.id}`} className="text-xs text-gray-500 font-medium font-mono mt-1">
                            {item.date}
                        </motion.span>
                    </div>

                    {/* Preview Content (Fades out when expanding) */}
                    <motion.div 
                        className="hidden md:block flex-1 mx-8"
                        animate={{ opacity: selectedId === item.id ? 0 : 1 }}
                    >
                       <p className="text-gray-400/80 text-sm truncate dir-rtl text-right">
                         {item.input}
                       </p>
                    </motion.div>

                    <motion.div 
                        className="p-2.5 rounded-full border border-white/5 bg-white/5 text-gray-500"
                        animate={{ opacity: selectedId === item.id ? 0 : 1 }}
                    >
                       <ChevronLeft className="w-5 h-5" />
                    </motion.div>
                </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-space-950/80 backdrop-blur-xl z-40"
            />

            {/* Modal Container Positioned */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedItem.id}`}
                className="w-full max-w-5xl h-[85vh] bg-[#0B0F19] border border-white/10 overflow-hidden shadow-2xl pointer-events-auto flex flex-col relative"
                style={{ borderRadius: '2.5rem' }}
                transition={SPRING_TRANSITION}
              >
                
                {/* Fixed Header in Modal */}
                <div className="flex items-center justify-between p-8 border-b border-white/5 bg-space-950/50 backdrop-blur-md z-20">
                    <div className="flex items-center gap-6">
                        <motion.div 
                            layoutId={`icon-${selectedItem.id}`} 
                            className={`p-4 rounded-2xl bg-gradient-to-br ${selectedItem.gradient} shadow-xl`}
                        >
                            <selectedItem.icon className="w-7 h-7 text-white" />
                        </motion.div>
                        <div>
                            <motion.h3 layoutId={`title-${selectedItem.id}`} className="text-2xl font-black text-white mb-1 tracking-tight">
                                {selectedItem.toolName}
                            </motion.h3>
                            <motion.div layoutId={`date-${selectedItem.id}`} className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{selectedItem.date}</span>
                            </motion.div>
                        </div>
                    </div>
                    
                    <motion.button 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setSelectedId(null)}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </motion.button>
                </div>

                {/* Content Container */}
                <motion.div 
                    className="flex-1 overflow-y-auto custom-scrollbar p-8 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                     {/* Background Glow inside modal */}
                     <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${selectedItem.gradient} opacity-[0.05] blur-[100px] pointer-events-none`}></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
                        {/* Input Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
                                <CornerDownLeft className="w-4 h-4" />
                                ورودی شما
                            </div>
                            <div className="p-6 rounded-3xl bg-space-900/50 border border-white/5 text-gray-200 text-lg leading-loose shadow-inner relative group hover:border-white/10 transition-colors">
                                {selectedItem.input}
                            </div>
                        </div>

                        {/* Output Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <div className="flex items-center gap-2 text-xs font-bold text-electric-blue uppercase tracking-widest">
                                    <Sparkles className="w-4 h-4" />
                                    خروجی هوش مصنوعی
                                </div>
                                <button 
                                    onClick={() => handleCopy(selectedItem.id, selectedItem.output)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-transparent ${copiedId === selectedItem.id ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/10'}`}
                                >
                                    {copiedId === selectedItem.id ? 'کپی شد' : 'کپی متن'}
                                    {copiedId === selectedItem.id ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                            <div className="p-6 rounded-3xl bg-black/40 border border-white/10 font-mono text-gray-300 text-[15px] leading-loose dir-ltr text-left selection:bg-electric-blue selection:text-black">
                                {selectedItem.output}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Related Activity */}
                    <div className="mt-12 pt-8 border-t border-white/5">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            فعالیت‌های اخیر {selectedItem.toolName}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {RELATED_ACTIVITY_MOCK.map((activity, index) => (
                                <motion.div 
                                    key={activity.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (index * 0.1) }}
                                    className="p-5 rounded-2xl bg-space-900/40 border border-white/5 hover:bg-space-800/60 hover:border-white/10 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider bg-white/5 px-2 py-1 rounded-md">{activity.date}</span>
                                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-electric-blue transition-colors -rotate-45" />
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                                        {activity.input}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryPage;
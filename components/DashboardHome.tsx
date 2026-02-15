
import React from 'react';
import { Tool } from '../types';
import { ArrowUpRight, Sparkles, ScanEye, ScanFace, Palette, Wand2, Zap, LayoutTemplate, Lightbulb, Copy, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { INITIAL_CARDS } from './MagicStudio';

interface DashboardHomeProps {
  tools: Tool[];
  onSelectTool: (tool: Tool) => void;
  onViewGallery: () => void;
  searchQuery: string;
}

const ToolIconMap: Record<string, React.ElementType> = {
  Sparkles,
  ScanEye,
  ScanFace,
  Palette,
  Wand2
};

// Unified Blue/Purple/Cyan theme for inspiration
const INSPIRATION_EXAMPLES = [
  {
    id: 1,
    title: "شهر سایبرپانکی",
    category: "سینمایی",
    output: "Futuristic cyberpunk city, neon-lit towers, flying cars, rain-slicked streets, cinematic atmosphere, 8k resolution.",
    gradient: "from-blue-600 to-indigo-500",
    color: "text-blue-400"
  },
  {
    id: 2,
    title: "طراحی فشن",
    category: "مد و استایل",
    output: "Avant-garde evening gown, Persian architecture inspiration, turquoise and gold silk, dramatic lighting, editorial style.",
    gradient: "from-cyan-600 to-blue-500",
    color: "text-cyan-400"
  },
  {
    id: 3,
    title: "پرتره فضانورد",
    category: "کاراکتر",
    output: "Portrait of young female astronaut, open helmet, nebula reflection, biometric fidelity, soft rim lighting, sci-fi aesthetic.",
    gradient: "from-indigo-600 to-purple-500",
    color: "text-indigo-400"
  },
  {
    id: 4,
    title: "تغییر روز به شب",
    category: "ویرایش",
    output: "Transform day to night, busy street scene, glowing lights, long exposure trails, deep shadows, cinematic urban photography.",
    gradient: "from-purple-600 to-blue-500",
    color: "text-purple-400"
  }
];

const DashboardHome: React.FC<DashboardHomeProps> = ({ tools, onSelectTool, onViewGallery, searchQuery }) => {
  const [copiedId, setCopiedId] = React.useState<number | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter Logic
  const filteredTools = tools.filter(tool => 
    tool.title.includes(searchQuery) || 
    tool.description.includes(searchQuery)
  );

  const filteredInspiration = INSPIRATION_EXAMPLES.filter(item => 
    item.title.includes(searchQuery) || 
    item.category.includes(searchQuery) ||
    item.output.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const galleryCount = INITIAL_CARDS.filter(card => 
    card.title.includes(searchQuery) ||
    card.category.includes(searchQuery) ||
    card.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  ).length;

  const hasTools = filteredTools.length > 0;
  const hasInspiration = filteredInspiration.length > 0;

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-12 pb-20">
      
      {/* Header Text - Only show if no search or if there are results */}
      <div className="space-y-3 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">پنل ابزارها</h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          مجموعه ابزارهای هوش مصنوعی برای تولید محتوای حرفه‌ای. ابزار مورد نظر خود را انتخاب کنید و خلاقیت را آغاز کنید.
        </p>
      </div>

      {/* SECTION 1: TOOLS GRID */}
      {(hasTools || !searchQuery) && (
      <section>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                <div className="p-1.5 rounded-lg bg-electric-blue/10">
                   <Zap className="w-4 h-4 text-electric-blue" />
                </div>
                ابزارهای ساخت
                <span className="bg-white/10 text-gray-300 px-2 py-0.5 rounded-full text-[10px] ml-2">{filteredTools.length}</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, index) => {
                const Icon = ToolIconMap[tool.iconName] || Sparkles;
                return (
                    <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelectTool(tool)}
                        className="group relative p-1 rounded-[2rem] cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                    >
                        {/* UNIFIED GLOW EFFECT: Using Primary Electric Blue for all cards */}
                        <div className="absolute inset-0 bg-electric-blue opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-[2rem] blur-xl" />
                        
                        {/* Card Content Container */}
                        <div className="relative h-full bg-space-900 rounded-[1.8rem] p-6 border border-white/5 group-hover:border-electric-blue/30 overflow-hidden transition-colors duration-300">
                            
                            {/* Subtle Blue Tint on Hover */}
                            <div className="absolute inset-0 bg-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Header: Icon & Arrow */}
                            <div className="flex items-start justify-between mb-6 relative z-10">
                                {/* Icon Container - Muted consistent look until hover */}
                                <div className={`
                                    w-14 h-14 rounded-2xl flex items-center justify-center
                                    bg-space-800 border border-white/10 text-gray-400
                                    group-hover:text-white group-hover:bg-gradient-to-br group-hover:${tool.gradient} group-hover:border-transparent
                                    group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg
                                `}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                
                                {/* Arrow Button */}
                                <div className="p-2.5 rounded-full bg-white/5 border border-white/5 text-gray-400 group-hover:bg-electric-blue group-hover:text-space-950 group-hover:border-electric-blue transition-all duration-300">
                                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                                </div>
                            </div>
                            
                            {/* Text Content */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">
                                    {tool.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-8 h-10 line-clamp-2 group-hover:text-gray-300 transition-colors">
                                    {tool.description}
                                </p>
                                
                                {/* Footer / Call to Action */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                                     <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
                                         آماده اجرا
                                     </span>
                                     <div className="flex items-center gap-2 text-xs font-bold text-gray-500 group-hover:text-electric-blue transition-colors">
                                         <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
                                            شروع کنید
                                         </span>
                                         <ArrowLeft className="w-4 h-4" />
                                     </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
      </section>
      )}

      {/* SECTION 2: INSPIRATION GALLERY */}
      {(hasInspiration || !searchQuery) && (
      <section>
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                <div className="p-1.5 rounded-lg bg-electric-purple/10">
                   <Lightbulb className="w-4 h-4 text-electric-purple" />
                </div>
                گالری الهام‌بخش
                <span className="bg-white/10 text-gray-300 px-2 py-0.5 rounded-full text-[10px] ml-2">{galleryCount}</span>
            </div>
            <button 
                onClick={onViewGallery}
                className="flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-white transition-colors py-1 px-3 rounded-full hover:bg-white/5"
            >
                مشاهده همه
                <ArrowLeft className="w-3.5 h-3.5" />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {filteredInspiration.map((item, index) => (
                 <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.05) }}
                    className="group relative flex flex-col bg-space-900 border border-white/5 rounded-3xl overflow-hidden hover:border-electric-blue/30 transition-all cursor-default"
                 >
                    {/* Right Accent Border (RTL) - Unified Blue/Purple */}
                    <div className={`absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b ${item.gradient}`} />
                    
                    {/* Hover Glow - Unified Blue */}
                    <div className="absolute inset-0 bg-electric-blue opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />

                    <div className="p-6 md:p-8 relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                 <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-electric-blue/20 transition-colors`}>
                                     <LayoutTemplate className="w-4 h-4 text-gray-300 group-hover:text-electric-blue" />
                                 </div>
                                 <span className="text-base font-bold text-white group-hover:text-electric-blue transition-colors">
                                     {item.title}
                                 </span>
                            </div>
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border border-white/5 bg-white/5 ${item.color}`}>
                                {item.category}
                            </span>
                        </div>
                        
                        <div className="relative bg-black/40 rounded-2xl p-4 border border-white/5 group-hover:border-electric-blue/20 transition-colors">
                            <p className="font-mono text-xs md:text-sm text-gray-400 leading-relaxed dir-ltr text-left line-clamp-3 group-hover:text-gray-300 transition-colors">
                                {item.output}
                            </p>
                            
                            {/* Copy Button Overlay */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy(item.id, item.output);
                                    }}
                                    className={`p-2 rounded-lg transition-all ${copiedId === item.id ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-300 hover:bg-electric-blue/20 hover:text-electric-blue'}`}
                                >
                                    {copiedId === item.id ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                             <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`}></div>
                                V3.5 Model
                             </div>
                             
                             <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopy(item.id, item.output);
                                }}
                                className={`flex items-center gap-1.5 text-[10px] font-bold transition-colors ${copiedId === item.id ? 'text-green-400' : 'text-gray-500 hover:text-white'}`}
                             >
                                {copiedId === item.id ? 'کپی شد' : 'کپی پرامپت'}
                             </button>
                        </div>
                    </div>
                 </motion.div>
             ))}
        </div>
      </section>
      )}

      {!hasTools && !hasInspiration && searchQuery && (
        <div className="text-center py-20 opacity-50">
            <p>هیچ موردی یافت نشد.</p>
        </div>
      )}

    </div>
  );
};

export default DashboardHome;

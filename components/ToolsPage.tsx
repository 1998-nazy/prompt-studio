
import React from 'react';
import { Tool } from '../types';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ScanEye, ScanFace, Palette, Wand2, Zap, ArrowRight } from 'lucide-react';

interface ToolsPageProps {
  tools: Tool[];
  onSelectTool: (tool: Tool) => void;
}

const ToolIconMap: Record<string, React.ElementType> = {
  Sparkles,
  ScanEye,
  ScanFace,
  Palette,
  Wand2
};

const ToolsPage: React.FC<ToolsPageProps> = ({ tools, onSelectTool }) => {
  return (
    <div className="p-6 md:p-12 max-w-[1600px] mx-auto min-h-full flex flex-col">
      {/* Premium Header Section */}
      <div className="mb-12 md:mb-20 relative z-10">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="flex flex-col md:flex-row md:items-end justify-between gap-8"
         >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-px w-8 bg-electric-blue/50"></div>
                 <span className="text-electric-blue text-xs font-bold uppercase tracking-[0.2em]">
                   AI Powered Suite
                 </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
                ابزارهای <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-electric-cyan to-white">هوش مصنوعی</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl border-r-2 border-white/10 pr-6 mr-1">
                مجموعه‌ای کامل از ابزارهای قدرتمند برای تبدیل ایده‌های شما به واقعیت. 
                ابزار مورد نظر خود را انتخاب کنید و خلاقیت را آغاز کنید.
              </p>
            </div>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10 pb-20">
        {tools.map((tool, index) => {
          const Icon = ToolIconMap[tool.iconName] || Sparkles;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              onClick={() => onSelectTool(tool)}
              className="group relative cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative h-full min-h-[320px] bg-space-900 border border-white/5 rounded-[3rem] p-8 md:p-10 overflow-hidden transition-all duration-500 group-hover:border-white/10 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                 
                 {/* Noise Texture & Gradient Background */}
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
                 <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${tool.gradient}`} />
                 
                 {/* Top Section */}
                 <div className="flex items-start justify-between mb-10 relative z-10">
                    <div className={`
                        w-24 h-24 rounded-[2rem] flex items-center justify-center
                        bg-space-950 border border-white/10 shadow-2xl
                        group-hover:scale-105 transition-transform duration-500 relative overflow-hidden
                    `}>
                        {/* Internal Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500`} />
                        <Icon className="w-10 h-10 text-white relative z-10" />
                        
                        {/* Reflection */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                    </div>

                    <div className={`
                        w-14 h-14 rounded-full border border-white/5 bg-white/5 flex items-center justify-center
                        group-hover:bg-electric-blue group-hover:text-space-950 group-hover:border-electric-blue
                        transition-all duration-300 group-hover:rotate-45
                    `}>
                        <ArrowUpRight className="w-6 h-6 text-current" />
                    </div>
                 </div>

                 {/* Content */}
                 <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                            {tool.title}
                        </h3>
                        <p className="text-base text-gray-400 font-medium leading-relaxed group-hover:text-gray-300 transition-colors duration-300 max-w-xs">
                            {tool.description}
                        </p>
                    </div>
                    
                    {/* Hover Action Label */}
                    <div className="mt-8 flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                        <span className="text-sm font-bold text-electric-blue uppercase tracking-widest">شروع کنید</span>
                        <ArrowRight className="w-4 h-4 text-electric-blue" />
                    </div>
                 </div>

                 {/* Bottom Glow Line */}
                 <div className={`
                    absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${tool.gradient}
                    w-0 group-hover:w-full transition-all duration-700 ease-out blur-[2px]
                 `} />
                 <div className={`
                    absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${tool.gradient}
                    w-0 group-hover:w-full transition-all duration-700 ease-out
                 `} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsPage;

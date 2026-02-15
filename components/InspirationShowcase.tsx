
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Quote, ArrowDown, ArrowLeft, Terminal, Bot, Copy, CheckCircle } from 'lucide-react';

const EXAMPLES = [
  {
    id: 1,
    tool: "متن به متن",
    category: "سینمایی و هنری",
    input: "یک شهر سایبرپانکی در تهران آینده با برج میلاد نئونی و ماشین‌های پرنده در هوای بارانی",
    output: "Futuristic cyberpunk Tehran city at night, neon-lit Milad Tower standing tall amidst holographic advertisements and flying cars, rain-slicked streets reflecting pink and cyan lights, cinematic atmosphere, 8k resolution, volumetric fog.",
    gradient: "from-blue-600 via-indigo-600 to-cyan-500",
    accent: "text-electric-blue"
  },
  {
    id: 2,
    tool: "دستیار مد",
    category: "طراحی فشن",
    input: "طراحی یک لباس شب مجلسی با الهام از معماری ایرانی و رنگ‌های فیروزه‌ای و طلایی",
    output: "Fashion photography of a female model wearing an avant-garde evening gown inspired by Persian architecture, intricate geometric patterns, turquoise and gold silk fabric, dramatic lighting, high fashion editorial style, detailed embroidery.",
    gradient: "from-pink-600 via-rose-500 to-orange-400",
    accent: "text-electric-pink"
  },
  {
    id: 3,
    tool: "ثبات چهره",
    category: "پرتره واقع‌گرایانه",
    input: "پرتره مردی ۳۰ ساله با ریش کوتاه و عینک گرد در حال نوشیدن قهوه در کافه دنج",
    output: "Portrait of a 30-year-old man with a short groomed beard and round glasses, sipping coffee by a window in a cozy cafe, bokeh raindrops on glass, soft warm lighting, photorealistic, 85mm lens, depth of field.",
    gradient: "from-purple-600 via-violet-500 to-pink-500",
    accent: "text-electric-purple"
  },
  {
    id: 4,
    tool: "ویرایش جادویی",
    category: "تغییر محیط",
    input: "تبدیل روز به شب در یک تصویر خیابان شلوغ با اضافه کردن چراغ‌های خیابانی روشن",
    output: "Transform day to night, busy street scene, glowing street lights, car trails long exposure, nocturnal atmosphere, deep shadows, high contrast, cinematic urban night photography.",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    accent: "text-orange-400"
  }
];

export const InspirationShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % EXAMPLES.length);
      setCopied(false);
    }, 8000); // 8 seconds for a calm pace
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentExample = EXAMPLES[currentIndex];

  return (
    <div className="h-full flex flex-col relative overflow-hidden rounded-[2.5rem] bg-space-900/20 border border-white/5 backdrop-blur-md">
       {/* Animated Background Mesh */}
       <AnimatePresence mode="wait">
          <motion.div
            key={currentExample.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${currentExample.gradient}`}
          />
       </AnimatePresence>

       <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                 <Sparkles className="w-5 h-5 text-electric-blue animate-pulse-slow" />
               </div>
               <div>
                 <h3 className="font-bold text-white text-lg">گالری الهام‌بخش</h3>
                 <p className="text-xs text-gray-500">نمونه‌هایی از جادوی هوش مصنوعی</p>
               </div>
             </div>
             
             {/* Progress Indicators */}
             <div className="flex gap-2">
               {EXAMPLES.map((_, idx) => (
                 <div key={idx} className="relative h-1.5 w-8 rounded-full bg-white/10 overflow-hidden">
                   {idx === currentIndex && (
                     <motion.div 
                       layoutId="active-progress"
                       className="absolute inset-0 bg-white"
                       initial={{ x: '-100%' }}
                       animate={{ x: '0%' }}
                       transition={{ duration: 8, ease: "linear" }}
                     />
                   )}
                 </div>
               ))}
             </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="space-y-8"
              >
                {/* Input Section */}
                <div className="relative group">
                  <div className="absolute -right-3 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  <div className="pr-6">
                     <div className="flex items-center gap-2 mb-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                       <Bot className="w-3 h-3" />
                       ورودی کاربر
                     </div>
                     <p className="text-lg md:text-xl font-medium text-white leading-relaxed">
                       {currentExample.input}
                     </p>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center opacity-30">
                  <ArrowDown className="w-6 h-6 animate-bounce" />
                </div>

                {/* Output Section */}
                <div className="relative bg-black/20 rounded-2xl p-6 border border-white/5 group/code">
                   <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                   
                   <div className="flex items-center justify-between mb-3 dir-ltr">
                       <div className="flex items-center gap-2 text-electric-cyan/80 text-xs font-bold uppercase tracking-wider">
                         <Terminal className="w-3 h-3" />
                         پرامپت نهایی
                       </div>
                       
                       <button
                         onClick={() => handleCopy(currentExample.output)}
                         className={`
                           flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all
                           ${copied 
                             ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                             : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 border border-transparent opacity-0 group-hover/code:opacity-100'}
                         `}
                       >
                         {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                         {copied ? 'کپی شد' : 'کپی'}
                       </button>
                   </div>
                   
                   <p className="font-mono text-sm md:text-base text-gray-300 leading-loose dir-ltr text-left opacity-90">
                     <span className={currentExample.accent}>&gt; </span>
                     {currentExample.output}
                     <span className="inline-block w-2 h-4 ml-1 bg-electric-blue/50 animate-pulse align-middle"></span>
                   </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-end gap-3 pt-2">
                   <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400">
                     {currentExample.tool}
                   </span>
                   <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400">
                     {currentExample.category}
                   </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
       </div>
    </div>
  );
};

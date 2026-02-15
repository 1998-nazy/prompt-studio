
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Copy, CheckCircle, Sparkles, X, Layers, Search, Zap, ArrowRightLeft, Info } from 'lucide-react';

// --- Types ---

export interface MagicCard {
  id: string;
  title: string;
  beforeUrl: string;
  afterUrl: string;
  prompt: string;
  gradient: string;
  glowColor: string;
  category: string;
  guide?: string;
}

export const INITIAL_CARDS: MagicCard[] = [
  {
    id: '13',
    title: "پرو مجازی مرد",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0MmYgiDEh8U6Svjf9Gsodz2xHhiQmyKpW3B7g",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0dnoVk8gtRcrk2jgPMdxUHWyneu7E0DhSa9VG",
    prompt: "Wear this cloth to a hyper-realistic full-body shot of a [Age]-year-old [Nationality] man with [Beard/Hair Details]. He is posing like a professional model, standing with a charismatic and strong posture. The lighting is [Lighting Style, e.g., moody, high-contrast, natural]. The background is a [Background, e.g., modern architecture, grey studio, urban city]. 8k resolution, highly detailed texture, sharp focus, GQ editorial style, depth of field.",
    gradient: "from-slate-600 to-blue-700",
    glowColor: "rgba(59, 130, 246, 0.4)",
    category: "پرو مجازی",
    guide: "برای استفاده از این الگوها، کافیست عبارات داخل کانت‌های [کروشه] را با جزئیات مورد نظر خود (مانند سن، ملیت، نوع لباس و پس‌زمینه) جایگزین کنید تا تصویر نهایی دقیقاً طبق خواسته شما ساخته شود."
  },
  {
    id: '14',
    title: "پرو مجازی زن",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0h72ZBeYZqcW6ORCSy19VMmQsnH5wfaBIg4FL",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0h19yJtYZqcW6ORCSy19VMmQsnH5wfaBIg4FL",
    prompt: "Wear this cloth to a hyper-realistic full-body shot of a [Age]-year-old [Nationality] woman with [Hair Color/Style], wearing [Detailed Clothing Description]. She is posing like a professional model, looking confident and elegant. The lighting is [Lighting Style, e.g., cinematic, studio softbox]. The background is a [Background, e.g., white studio, luxury street, blurred nature]. 8k resolution, photorealistic, intricate fabric details, sharp focus, vogue magazine style, masterpiece.",
    gradient: "from-fuchsia-600 to-pink-600",
    glowColor: "rgba(236, 72, 153, 0.4)",
    category: "پرو مجازی",
    guide: "برای استفاده از این الگوها، کافیست عبارات داخل کانت‌های [کروشه] را با جزئیات مورد نظر خود (مانند سن، ملیت، نوع لباس و پس‌زمینه) جایگزین کنید تا تصویر نهایی دقیقاً طبق خواسته شما ساخته شود."
  },
  {
    id: '15',
    title: "پرو مجازی پسر",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0XHgQnwy2L8dJwoRiFA1PYWmqDpjcX4Bztfhu",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0AfyaKUd2o5gt0LMsrWmnTyCDFpvEQbUeXlqH",
    prompt: "Wear this cloth to a high-quality commercial photography shot of a [Age]-year-old [Nationality] boy, wearing [Detailed Clothing Description]. He is striking a cool, casual pose with a friendly expression. Natural daylight. The background is a [Background, e.g., skate park, brick wall, clean studio]. Ultra-detailed, photorealistic, sharp focus, 8k, realistic fabric texture",
    gradient: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
    category: "پرو مجازی",
    guide: "برای استفاده از این الگوها، کافیست عبارات داخل کانت‌های [کروشه] را با جزئیات مورد نظر خود (مانند سن، ملیت، نوع لباس و پس‌زمینه) جایگزین کنید تا تصویر نهایی دقیقاً طبق خواسته شما ساخته شود."
  },
  {
    id: '16',
    title: "پرو مجازی دختر",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0dDvpxLgtRcrk2jgPMdxUHWyneu7E0DhSa9VG",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0phdT2XUm64dqLGyj1KTZcA3iIJv70znwMFWa",
    prompt: "Wear this cloth to a high-quality commercial photography shot of a [Age]-year-old [Nationality] girl, wearing [Detailed Clothing Description]. She is posing naturally and happily, looking stylish. Soft, bright lighting. The background is a [Background, e.g., park, pastel studio, playroom]. Ultra-detailed, photorealistic, sharp focus, 8k, vibrant colors, catalogue quality.",
    gradient: "from-rose-400 to-orange-400",
    glowColor: "rgba(251, 113, 133, 0.4)",
    category: "پرو مجازی",
    guide: "برای استفاده از این الگوها، کافیست عبارات داخل کانت‌های [کروشه] را با جزئیات مورد نظر خود (مانند سن، ملیت، نوع لباس و پس‌زمینه) جایگزین کنید تا تصویر نهایی دقیقاً طبق خواسته شما ساخته شود."
  },
  {
    id: '17',
    title: "پرو مجازی کودک",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0yALIxMiiFOt0Xx6gIjT29aYuQSKBmeqHkNWw",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0WhE5S7OOHNp31SZrJwY4BQo56jsdgiFzXbqA",
    prompt: "Wear this cloth to a high-quality, adorable commercial shot of a [Age, e.g., 6-month-old] [Nationality] baby, wearing [Detailed Clothing Description]. The baby is [Action, e.g., sitting up, crawling, sleeping], looking [Expression, e.g., happy, curious, peaceful]. Soft, diffused natural lighting. The background is a [Background, e.g., cozy nursery, soft blanket, white studio]. 8k resolution, macro details of skin texture, soft focus, dreamy atmosphere, angelic.",
    gradient: "from-amber-300 to-orange-400",
    glowColor: "rgba(251, 191, 36, 0.4)",
    category: "پرو مجازی",
    guide: "برای استفاده از این الگوها، کافیست عبارات داخل کانت‌های [کروشه] را با جزئیات مورد نظر خود (مانند سن، ملیت، نوع لباس و پس‌زمینه) جایگزین کنید تا تصویر نهایی دقیقاً طبق خواسته شما ساخته شود."
  },
  {
    id: '2',
    title: "سایبرپانک",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0gGxsPmjlGaxyBTpkeLc5qjZfYnb4NDQICutd",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0NVinhzDEt8CxJYsdODwnMHbko94TG0EArcUX",
    prompt: "Cyberpunk style, neon glowing circuitry, futuristic city background, cyan and magenta rim lighting, cinematic depth of field, sharp details.",
    gradient: "from-electric-cyan to-electric-purple",
    glowColor: "rgba(0, 255, 247, 0.4)",
    category: "محیطی"
  },
  {
    id: '1',
    title: "عروس سلطنتی",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0QRJ6RlsHWufgPF4hEnzTtRNkQZUV20X6aGcC",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0wYFuSHqA1grui97VjpzvdlD8BUxEqhLTsPC4",
    prompt: "Put a bridal tiara on her head, professional bridal makeup, soft lighting, high detail, royal atmosphere, photorealistic portrait.",
    gradient: "from-amber-400 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
    category: "پرتره"
  },
  {
    id: '4',
    title: "نقاشی رنگ روغن",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0w57ANMqA1grui97VjpzvdlD8BUxEqhLTsPC4",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0odrU1tpP92rTzBLhSMiwp6cI1Vy0EtkgnsHO",
    prompt: "Oil painting style, thick brush strokes, impressionist texture, artistic lighting, canvas texture, museum quality masterpiece.",
    gradient: "from-red-600 to-amber-500",
    glowColor: "rgba(220, 38, 38, 0.3)",
    category: "هنری"
  },
  {
    id: '6',
    title: "انیمه مدرن",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt00MuQONlgbtErw6k74jvS5YyN9fLsGxAaRBVq",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0RtEXk4WfKB57TMmihEaCFg8bvlHZq1IwRrX4",
    prompt: "Modern anime style, vibrant colors, cel shading, studio ghibli aesthetic, dramatic lighting, 2D animation look, highly detailed background.",
    gradient: "from-pink-500 to-violet-500",
    glowColor: "rgba(236, 72, 153, 0.4)",
    category: "انیمه"
  },
  {
    id: '3',
    title: "دیزنی/پیکسار",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0xkHyP2fK38V5Gatsk7CAIXeWEdwTqPibUM0g",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0gHPTlajlGaxyBTpkeLc5qjZfYnb4NDQICutd",
    prompt: "3D Disney Pixar style character, cute big eyes, soft rendering, clay texture, cheerful expression, vibrant studio lighting.",
    gradient: "from-blue-400 to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.3)",
    category: "رندر سه بعدی"
  },
  {
    id: '5',
    title: "وینتیج کلاسیک",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0srdVUE4KBZ9hQdPknatNICOqRu2jx4YzSsoF",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0eQv0nAKw7A4IQZNMSrJb8Btn6RzCVpKlGayT",
    prompt: "Vintage 1920s photograph, black and white, film grain, sepia tone, classic hollywood lighting, nostalgic grain effect.",
    gradient: "from-stone-500 to-stone-300",
    glowColor: "rgba(168, 162, 158, 0.2)",
    category: "عکاسی"
  },
  {
    id: '7',
    title: "طراحی مدادی",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0Oqcw1utCSxUFL9gtGAwoB0QRCh3Wpvm8EIZa",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0jXtyqN07kLoxbWSTfGXieOQ1RnZDFIMm94Pc",
    prompt: "Charcoal pencil sketch, rough paper texture, monochrome, hand-drawn cross-hatching technique, graphite shading, artistic sketchbook style.",
    gradient: "from-gray-400 to-slate-500",
    glowColor: "rgba(148, 163, 184, 0.4)",
    category: "طراحی"
  },
  {
    id: '8',
    title: "لگو",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0sF8szV94KBZ9hQdPknatNICOqRu2jx4YzSso",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt03p8OQ526b9xSrVNEp7q4mOUGule81nPajBQ0",
    prompt: "A 3D Lego minifigure, cylindrical yellow head, C-shaped hands, blocky body, made of plastic lego bricks, The Lego Movie style, macro photography, depth of field, 3D render, vibrant colors.",
    gradient: "from-yellow-400 to-red-500",
    glowColor: "rgba(250, 204, 21, 0.4)",
    category: "هنر سه بعدی"
  },
  {
    id: '9',
    title: "مجسمه شنی",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt08bhgNRPWC31BPutmjN9G8ETZ60l4SVgheiXJ",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0HUzZS8lcDT3dtCqp8vk5Ou4mQhg9PIa10fJR",
    prompt: "A monochromatic sculpture made entirely of wet sand, highly detailed sand carving, grainy texture, uniform beige color, no fur, no skin, no eyes, beach background, realistic sand art competition style.",
    gradient: "from-orange-200 to-stone-400",
    glowColor: "rgba(214, 180, 126, 0.4)",
    category: "مجسمه سازی"
  },
  {
    id: '10',
    title: "دکور",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0ULvMCOt5fOcps5RN9qK2gAUi6aoYGP41vIx0",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0BkJ6uBH6o4IpcFOqntSHvlasdJ5E72hkXRYi",
    prompt: "Boho-chic interior design style, rattan furniture, macrame decorations, many indoor plants, cozy warm sunlight, architectural digest photography, clean and stylish living space.",
    gradient: "from-teal-400 to-emerald-500",
    glowColor: "rgba(52, 211, 153, 0.4)",
    category: "دکوراسیون"
  },
  {
    id: '11',
    title: "تتو",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0m83g7LkfGgF9EMaq2J03yShRmkO5XxnAiWKH",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0gGw31NjlGaxyBTpkeLc5qjZfYnb4NDQICutd",
    prompt: "Minimalist fine line tattoo design, black ink on white paper, stipple shading, dotwork, clean vector lines, illustration style, high contrast, no background, simple and elegant art.",
    gradient: "from-gray-400 to-slate-600",
    glowColor: "rgba(148, 163, 184, 0.4)",
    category: "تتو"
  },
  {
    id: '12',
    title: "خوشنویسی فارسی",
    beforeUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0P7iNqI3oLh1OdHKsmX6QVYJGBl4tMER5CSir",
    afterUrl: "https://r2k7606loa.ufs.sh/f/ypOxSWiiFOt0gW0YdcjlGaxyBTpkeLc5qjZfYnb4NDQICutd",
    prompt: "Artistic Persian Calligraphy style, the image is composed of meaningful Farsi poetry by Rumi (Molana) written in graceful Nastaliq script, fluid black ink strokes, gold leaf splatters, rough paper texture, abstract masterpiece, cultural heritage aesthetic.",
    gradient: "from-amber-400 to-yellow-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
    category: "خوشنویسی"
  }
];

// --- Sub-Components ---

const ComparisonSlider: React.FC<{ before: string; after: string }> = ({ before, after }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as any).touches[0].clientX : (e as any).clientX;
    const relativeX = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    setSliderPos(relativeX);
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-square rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="After" />
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={before} className="absolute inset-0 w-full h-full object-cover" alt="Before" />
        {/* Overlay Label for Before */}
        <div 
          className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest pointer-events-none shadow-xl z-20 transition-opacity duration-300"
          style={{ opacity: sliderPos < 10 ? 0 : 1 }}
        >
          تصویر اصلی
        </div>
      </div>
      
      {/* Overlay Label for After */}
      <div 
        className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest pointer-events-none shadow-xl z-20 transition-opacity duration-300"
        style={{ opacity: sliderPos > 90 ? 0 : 1 }}
      >
        هوش مصنوعی
      </div>

      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10 transition-colors group-hover:bg-electric-blue"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/50 group-hover:scale-110 transition-transform">
           <ArrowRightLeft className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

// Animated Skeleton Component
const CardSkeleton = () => (
  <div className="relative h-full aspect-[4/5] rounded-[2rem] bg-space-900 border border-white/5 overflow-hidden">
    <div className="absolute inset-0 flex flex-col">
       <div className="flex-1 bg-space-800/50" />
       <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-space-950/80 to-transparent" />
    </div>
    <div className="absolute top-3 left-3 w-14 h-14 rounded-xl bg-white/5 border border-white/5" />
    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="flex items-end justify-between">
            {/* Icon Skeleton (Right in RTL) */}
            <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
            
            {/* Text Skeleton (Left in RTL) */}
            <div className="flex flex-col items-end gap-3 w-full pr-4">
                <div className="w-16 h-4 rounded bg-white/5 self-end" />
                <div className="w-32 h-8 rounded bg-white/5 self-end" />
            </div>
        </div>
    </div>
    <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg]"
        initial={{ x: '-150%' }}
        animate={{ x: '150%' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }}
    />
  </div>
);

// Individual Card Component that handles its own loading state
const MagicCardItem: React.FC<{
  card: MagicCard;
  index: number;
  shouldLoad: boolean;
  onLoadComplete: () => void;
  onClick: (card: MagicCard) => void;
}> = ({ card, index, shouldLoad, onLoadComplete, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      const loadImages = async () => {
        try {
          // Load images sequentially for this card
          await Promise.all([
            new Promise((resolve) => {
              const img = new Image();
              img.src = card.beforeUrl;
              img.onload = resolve;
              img.onerror = resolve; 
            }),
            new Promise((resolve) => {
              const img = new Image();
              img.src = card.afterUrl;
              img.onload = resolve;
              img.onerror = resolve;
            })
          ]);
        } catch (e) {
          console.error("Image load error", e);
        } finally {
          setIsLoaded(true);
          onLoadComplete();
        }
      };
      loadImages();
    }
  }, [shouldLoad, card.beforeUrl, card.afterUrl]);

  return (
    <div className="relative h-full aspect-[4/5] cursor-pointer" onClick={() => isLoaded && onClick(card)}>
      <AnimatePresence mode='popLayout'>
        {!isLoaded ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10"
          >
            <CardSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="group relative h-full w-full"
          >
             {/* Glow Behind */}
             <div 
               className="absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
               style={{ backgroundImage: `linear-gradient(to bottom right, ${card.glowColor}, transparent)` }}
             />
             
             <div className="relative h-full w-full rounded-[2rem] bg-space-900 border border-white/5 group-hover:border-white/10 transition-all duration-300 overflow-hidden">
                 
                 {/* Main Image */}
                 <img 
                     src={card.afterUrl} 
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                     alt={card.title} 
                 />
                 
                 {/* Reference Image (Top Left) */}
                 <div className="absolute top-3 left-3 w-14 h-14 rounded-xl overflow-hidden border-2 border-white/20 shadow-xl backdrop-blur-sm z-20 transition-transform duration-300 group-hover:scale-110 group-hover:border-electric-blue/50">
                     <img src={card.beforeUrl} className="w-full h-full object-cover" alt="Ref" />
                     <div className="absolute inset-0 bg-black/20" />
                 </div>

                 {/* Bottom Gradient Overlay */}
                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                 
                 {/* Content Area */}
                 <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                     <div className="flex items-end justify-between">
                         
                         {/* Action Icon - Moved to Right (First in RTL Flex) */}
                         <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300 shrink-0`}>
                             <Zap className="w-5 h-5 text-white fill-white" />
                         </div>

                         {/* Text Info - Moved to Left (Second in RTL Flex) */}
                         <div className="flex flex-col items-end text-left w-full pr-4"> 
                             <span className="px-2.5 py-1 mb-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-gray-300 uppercase tracking-widest shadow-sm self-end">
                                 {card.category}
                             </span>
                             <h3 className="text-2xl font-black text-white leading-none tracking-tight group-hover:text-electric-blue transition-colors text-left self-end">
                                 {card.title}
                             </h3>
                         </div>
                     </div>
                 </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MagicStudioProps {
    searchQuery: string;
}

export const MagicStudio: React.FC<MagicStudioProps> = ({ searchQuery }) => {
  const [selectedCard, setSelectedCard] = useState<MagicCard | null>(null);
  const [copied, setCopied] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadComplete = useCallback(() => {
    setLoadedCount(prev => prev + 1);
  }, []);

  const filteredCards = INITIAL_CARDS.filter(card => 
    card.title.includes(searchQuery) ||
    card.category.includes(searchQuery) ||
    card.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto min-h-full pb-20">
      
      {/* 1. Header Area with compact layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">گالری جادویی</h2>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              ویترین منتخب از تحولات هوش مصنوعی. قدرت کلمات را در خلق واقعیت‌های بصری جدید مشاهده کنید.
            </p>
          </div>
      </div>

      {/* 2. GRID GALLERY */}
      {filteredCards.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCards.map((card, idx) => (
          <MagicCardItem 
             key={card.id}
             card={card}
             index={idx}
             onClick={setSelectedCard}
             // Load strategy: Load this card if previous ones are done (with a buffer of +1 to keep pipeline moving)
             // This ensures "one by one" feeling without stalling the network or UI
             shouldLoad={idx <= loadedCount + 1}
             onLoadComplete={handleLoadComplete}
          />
        ))}
      </div>
      ) : (
        <div className="text-center py-20 opacity-50">
            <p>هیچ موردی یافت نشد.</p>
        </div>
      )}

      {/* 3. IMMERSIVE DETAIL MODAL */}
      <AnimatePresence>
        {selectedCard && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 bg-[#05070e]/90 backdrop-blur-xl z-[100]"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div 
                className="w-full max-w-6xl h-full max-h-[90vh] bg-[#0a0e1a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl pointer-events-auto flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Modal Header */}
                <div className="flex items-center justify-between p-8 border-b border-white/5 bg-space-950/50">
                   <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedCard.gradient} flex items-center justify-center shadow-lg shadow-${selectedCard.glowColor.replace('0.4', '0.2')}`}>
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">{selectedCard.title}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">پردازش هوش مصنوعی تکمیل شد</span>
                        </div>
                      </div>
                   </div>
                   
                   <button 
                     onClick={() => setSelectedCard(null)}
                     className="group p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/10"
                   >
                     <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                   </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-full">
                   
                   {/* Left: Interactive Visual */}
                   <div className="w-full lg:w-7/12 p-8 bg-black/20 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-l border-white/5 relative">
                      <div className="w-full max-w-2xl h-full flex flex-col justify-center">
                         <ComparisonSlider 
                           before={selectedCard.beforeUrl} 
                           after={selectedCard.afterUrl} 
                         />
                         <div className="mt-6 flex items-center justify-center gap-8 opacity-60">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-electric-cyan uppercase tracking-widest">
                               <Sparkles className="w-4 h-4" /> خروجی نهایی
                            </div>
                            <div className="w-12 h-[1px] bg-white/20"></div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                               <Layers className="w-4 h-4" /> تصویر اولیه
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Right: Prompt Data */}
                   <div className="w-full lg:w-5/12 flex flex-col bg-space-900/50 relative">
                       {/* Guide Section (Conditional) */}
                       {selectedCard.guide && (
                            <div className="p-6 border-b border-white/5 bg-electric-blue/5 backdrop-blur-sm">
                                <div className="flex items-center gap-2 text-electric-blue font-bold text-sm mb-2">
                                    <Info className="w-4 h-4" />
                                    راهنمای استفاده
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed text-justify font-sans">
                                    {selectedCard.guide}
                                </p>
                            </div>
                       )}

                       {/* Prompt Section */}
                       <div className="flex-1 p-6 flex flex-col min-h-0 overflow-hidden">
                           <div className="flex items-center justify-end mb-4 shrink-0">
                               <button 
                                  onClick={() => handleCopyPrompt(selectedCard.prompt)}
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${copied ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-gray-400 hover:text-white border-white/5 hover:border-white/10'}`}
                               >
                                  {copied ? 'کپی شد' : 'کپی پرامپت'}
                                  {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                               </button>
                           </div>
                           
                           {/* Code Editor Box */}
                           <div className="relative flex-1 group min-h-0">
                               <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-30 blur-sm pointer-events-none"></div>
                               <div className="relative h-full w-full rounded-2xl bg-[#05070e] border border-white/10 flex flex-col shadow-inner">
                                  <div className="flex-1 overflow-y-auto custom-scrollbar p-6 font-mono text-base text-gray-300 leading-loose dir-ltr text-left">
                                      {selectedCard.prompt}
                                  </div>
                               </div>
                           </div>
                       </div>
                   </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagicStudio;

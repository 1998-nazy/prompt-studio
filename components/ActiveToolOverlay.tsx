
import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, Send, Copy, Sparkles, Upload, Wand2, Palette, ScanFace, ScanEye, PenTool, CheckCircle, ChevronRight, FileImage, Trash2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tool } from '../types';
import { generatePromptFromText, generatePromptFromImage } from '../services/geminiService';

interface ActiveToolOverlayProps {
  tool: Tool | null;
  onClose: () => void;
}

const ProcessingView = () => (
  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-space-950/90 backdrop-blur-xl rounded-xl">
    <div className="relative w-40 h-40">
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles className="w-16 h-16 text-electric-blue animate-pulse" />
      </div>
      <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '4s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-electric-cyan rounded-full shadow-[0_0_15px_#00fff7]"></div>
      </div>
      <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-electric-purple rounded-full shadow-[0_0_15px_#b030ff]"></div>
      </div>
      <div className="absolute inset-2 border border-dashed border-white/10 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }}></div>
    </div>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
      className="mt-10 text-xl font-bold bg-gradient-to-r from-electric-blue to-electric-purple bg-clip-text text-transparent"
    >
      هوش مصنوعی در حال پردازش است...
    </motion.p>
  </div>
);

const ActiveToolOverlay: React.FC<ActiveToolOverlayProps> = ({ tool, onClose }) => {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tool) {
        setInputText('');
        setOutput('');
        setIsProcessing(false);
        setSelectedFile(null);
        setCopied(false);
        setIsListening(false);
    }
  }, [tool]);

  if (!tool) return null;

  const handleGenerate = async () => {
    if (!inputText && !selectedFile && tool.id !== 'visual-describer') return;
    
    setIsProcessing(true);
    
    try {
        let result: string;
        if (selectedFile && (['visual-describer', 'smart-editor', 'character'].includes(tool.id))) {
            result = await generatePromptFromImage(selectedFile, inputText || "Describe this.", tool.id); 
        } else {
            result = await generatePromptFromText(inputText, tool.id);
        }
        setOutput(result);
    } catch (err) {
        setOutput("خطایی رخ داد. لطفا دوباره تلاش کنید.");
    } finally {
        setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setSelectedFile(e.target.files[0]);
      }
  };

  const handleMicClick = () => {
    if (isListening) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("مرورگر شما از قابلیت تبدیل گفتار به نوشتار پشتیبانی نمی‌کند.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText((prev) => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.start();
  };

  const isImageTool = ['visual-describer', 'smart-editor', 'character'].includes(tool.id);

  const Icon = {
    'Sparkles': Sparkles,
    'ScanEye': ScanEye,
    'ScanFace': ScanFace,
    'Palette': Palette,
    'Wand2': Wand2
  }[tool.iconName];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-space-950/95 backdrop-blur-md"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          className="w-full max-w-6xl h-full max-h-[90vh] bg-space-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-6 bg-space-800/30 border-b border-white/5">
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-2xl`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white leading-none mb-1">{tool.title}</h2>
                <p className="text-sm text-gray-500 font-medium">{tool.description}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Input Panel */}
            <div className="w-full lg:w-1/2 p-8 overflow-y-auto border-b lg:border-b-0 lg:border-l border-white/5 space-y-8">
              
              {isImageTool && (
                <div className="space-y-4">
                  <label className="text-sm text-gray-400 font-bold flex items-center gap-2">
                    <ScanEye className="w-4 h-4 text-electric-blue" />
                    مرجع تصویری
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                      relative aspect-video rounded-3xl border-2 border-dashed transition-all cursor-pointer group flex flex-col items-center justify-center
                      ${selectedFile ? 'border-electric-blue/50 bg-electric-blue/5 shadow-[inset_0_0_20px_rgba(0,212,255,0.05)]' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}
                    `}
                  >
                    <input ref={fileInputRef} type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                    {selectedFile ? (
                      <div className="w-full h-full p-4">
                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-full h-full object-contain rounded-xl" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                            className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-space-800 flex items-center justify-center group-hover:scale-110 transition-all shadow-lg">
                          <Upload className="w-8 h-8 text-electric-blue" />
                        </div>
                        <p className="text-white font-bold text-lg">بارگذاری تصویر</p>
                        <p className="text-sm text-gray-500 mt-1">تصویر را بکشید یا کلیک کنید</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex-1 flex flex-col gap-4">
                <label className="text-sm text-gray-400 font-bold flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-electric-purple" />
                  دستورات متنی
                </label>
                <div className="relative flex-1 min-h-[150px]">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="جزئیات را به فارسی بنویسید..."
                    className="w-full h-full bg-space-800/40 border border-white/10 rounded-3xl p-6 text-right leading-loose focus:outline-none focus:border-electric-blue/50 focus:bg-space-800 transition-all resize-none text-white placeholder-gray-600 text-lg shadow-inner"
                    dir="rtl"
                  />
                  <div className="absolute bottom-6 left-6 flex gap-3">
                     <button 
                       onClick={handleMicClick}
                       className={`p-3 transition-all rounded-xl border ${isListening ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse' : 'bg-white/5 text-gray-400 hover:text-electric-blue hover:bg-white/10 border-white/5'}`}
                     >
                        <Mic className="w-5 h-5" />
                     </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isProcessing || (!inputText && !selectedFile)}
                className={`
                  w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all
                  shadow-2xl hover:scale-[1.01] active:scale-[0.99]
                  bg-gradient-to-r ${tool.gradient} text-white
                  disabled:opacity-40 disabled:cursor-not-allowed
                `}
              >
                <Zap className="w-6 h-6 fill-current" />
                {isProcessing ? 'در حال خلق جادو...' : 'تولید پرامپت حرفه‌ای'}
              </button>
            </div>

            {/* Output Panel */}
            <div className="w-full lg:w-1/2 bg-black/40 p-8 flex flex-col relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <FileImage className="w-5 h-5 text-electric-cyan" />
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase opacity-70">پرامپت نهایی</span>
                </div>
                {output && (
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${copied ? 'bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-white/5 text-gray-200 hover:bg-white/10 hover:border-white/10 border border-transparent'}`}
                  >
                    {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'کپی شد' : 'کپی متن نهایی'}
                  </button>
                )}
              </div>

              <div className="flex-1 relative rounded-[2rem] border border-white/10 bg-space-950/80 overflow-hidden shadow-2xl">
                {isProcessing && <ProcessingView />}

                {output ? (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-8 h-full overflow-y-auto custom-scrollbar"
                  >
                    <div className="font-mono text-gray-100 text-left leading-relaxed text-lg lg:text-xl selection:bg-electric-blue selection:text-space-950">
                      {output}
                    </div>
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/5 flex items-center justify-center mb-6 animate-pulse">
                      <Sparkles className="w-10 h-10 text-gray-800" />
                    </div>
                    <h3 className="text-gray-500 font-bold text-lg mb-2">در انتظار فرمان شما</h3>
                    <p className="text-gray-700 text-sm max-w-xs">پرامپت نهایی با رعایت استانداردهای جهانی تصویرسازی در اینجا ظاهر خواهد شد.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ActiveToolOverlay;

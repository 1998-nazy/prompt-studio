
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Copy, Sparkles, Upload, Camera, PenTool, CheckCircle, Trash2, Zap, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tool } from '../types';
import { generatePromptFromText, generatePromptFromImage } from '../services/geminiService';

interface ToolWorkspaceProps {
  tool: Tool;
  onBack: () => void;
}

const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({ tool, onBack }) => {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset state when tool changes
    setInputText('');
    setOutput('');
    setIsProcessing(false);
    setSelectedFile(null);
  }, [tool]);

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
      alert("مرورگر شما پشتیبانی نمی‌کند.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'fa-IR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText((prev) => prev + (prev ? ' ' : '') + transcript);
    };
    recognition.start();
  };

  const isImageTool = ['visual-describer', 'smart-editor', 'character'].includes(tool.id);

  return (
    <div className="h-full flex flex-col p-6 max-w-[1600px] mx-auto w-full">
      {/* Tool Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-xl bg-space-900 border border-white/5 hover:border-electric-blue/50 text-gray-400 hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
             <h2 className="text-2xl font-bold text-white flex items-center gap-3">
               {tool.title}
             </h2>
             <p className="text-sm text-gray-500">{tool.description}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* INPUT COLUMN */}
        <div className="w-full lg:w-5/12 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
          
          {/* Image Upload Area */}
          {isImageTool && (
            <div className="bg-space-900 border border-white/5 rounded-3xl p-6">
               <label className="text-sm text-gray-400 font-bold mb-4 flex items-center gap-2">
                 <Camera className="w-4 h-4 text-electric-blue" />
                 مرجع تصویری
               </label>
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className={`
                   relative aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden
                   ${selectedFile ? 'border-electric-blue/50 bg-electric-blue/5' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}
                 `}
               >
                 <input ref={fileInputRef} type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                 {selectedFile ? (
                   <>
                     <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-full h-full object-cover" />
                     <button 
                       onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                       className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-red-500 text-white rounded-lg transition-colors backdrop-blur-md"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </>
                 ) : (
                   <div className="text-center p-4">
                     <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-space-800 flex items-center justify-center shadow-lg">
                       <Upload className="w-5 h-5 text-electric-blue" />
                     </div>
                     <p className="text-sm text-white font-medium">بارگذاری فایل</p>
                   </div>
                 )}
               </div>
            </div>
          )}

          {/* Text Input Area */}
          <div className="bg-space-900 border border-white/5 rounded-3xl p-6 flex-1 flex flex-col min-h-[300px]">
             <div className="flex justify-between items-center mb-4">
                <label className="text-sm text-gray-400 font-bold flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-electric-purple" />
                  ورودی متن
                </label>
                <button 
                   onClick={handleMicClick}
                   className={`p-2 rounded-lg transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                >
                   <Mic className="w-4 h-4" />
                </button>
             </div>
             
             <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="توصیفات خود را اینجا بنویسید..."
                className="w-full flex-1 bg-space-950/50 border border-white/5 rounded-xl p-4 text-right leading-relaxed focus:outline-none focus:border-electric-blue/30 transition-all resize-none text-white placeholder-gray-600 text-base"
                dir="rtl"
             />

             <button
                onClick={handleGenerate}
                disabled={isProcessing || (!inputText && !selectedFile)}
                className={`
                  mt-6 w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                  bg-gradient-to-r ${tool.gradient} text-white shadow-lg hover:shadow-electric-blue/20 hover:scale-[1.01]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                `}
              >
                {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-current" />}
                {isProcessing ? 'پردازش...' : 'اجرای دستور'}
              </button>
          </div>
        </div>

        {/* OUTPUT COLUMN */}
        <div className="w-full lg:w-7/12 bg-space-900 border border-white/5 rounded-3xl p-6 flex flex-col relative overflow-hidden">
           <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-8 rounded-full bg-electric-cyan"></div>
                 <h3 className="font-bold text-white">خروجی هوش مصنوعی</h3>
              </div>
              {output && (
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${copied ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'کپی شد' : 'کپی'}
                  </button>
              )}
           </div>

           <div className="flex-1 relative overflow-y-auto custom-scrollbar">
              {isProcessing ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative w-20 h-20 mb-6">
                       <div className="absolute inset-0 border-4 border-electric-blue/30 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-t-electric-blue rounded-full animate-spin"></div>
                       <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-white animate-pulse" />
                    </div>
                    <p className="text-gray-400 animate-pulse">درحال نوشتن پرامپت...</p>
                 </div>
              ) : output ? (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-gray-200 text-lg leading-loose whitespace-pre-wrap dir-ltr text-left"
                 >
                    {output}
                 </motion.div>
              ) : (
                 <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                    <Sparkles className="w-16 h-16 mb-4" />
                    <p>نتیجه اینجا نمایش داده می‌شود</p>
                 </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ToolWorkspace;

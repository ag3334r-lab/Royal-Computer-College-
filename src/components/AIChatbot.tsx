import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bot, 
  Send, 
  X, 
  MessageCircle, 
  Sparkles, 
  User, 
  ChevronRight,
  BrainCircuit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getModel, genAI } from '@/lib/gemini';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot({ context }: { context?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your Royal AI Assistant. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const model = getModel();
      const prompt = `
        You are "Royal AI", a helpful, professional, and friendly learning assistant for Royal Computer College students.
        Royal Computer College offers courses in AI, Web Dev, Cyber Security, etc.
        Context: ${context || 'General navigation'}
        
        Answer the user's question concisely and professionally. If they ask about code, provide clear examples.
        
        User question: ${userMessage}
      `;

      const result = await genAI.models.generateContent({ model: model, contents: prompt });
      const response = result.text || 'I am currently offline.';
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection issue. Please try again soon!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-4 w-[90vw] sm:w-[400px]"
          >
            <Card className="shadow-2xl border-primary/20 overflow-hidden rounded-[2rem] glass-dark text-white">
              <CardHeader className="bg-primary p-4 border-b border-white/10 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                     <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-md font-display font-bold">Royal AI Assistant</CardTitle>
                    <div className="flex items-center text-[10px] opacity-80 uppercase tracking-widest font-bold">
                       <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
                       Online & Ready
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white rounded-full" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-4 text-sm bg-black/40">
                  <div className="space-y-4">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl ${
                          m.role === 'user' 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-white/10 text-white border border-white/10 backdrop-blur-sm rounded-tl-none'
                        }`}>
                          {m.content}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none flex gap-1">
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                      </div>
                    )}
                    <div ref={scrollRef}></div>
                  </div>
                </ScrollArea>
                <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                  <Input 
                    placeholder="Ask me anything..." 
                    className="bg-white/10 border-none text-white focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30 rounded-xl"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button size="icon" className="bg-white text-primary hover:bg-white/90 rounded-xl" onClick={handleSend} disabled={loading}>
                     <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {!isOpen && (
         <div className="absolute -top-1 -right-1">
            <span className="flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
            </span>
         </div>
      )}
    </div>
  );
}

// Minimal stub for input if not available
function Input(props: any) {
  return (
    <input 
      {...props} 
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`} 
    />
  );
}

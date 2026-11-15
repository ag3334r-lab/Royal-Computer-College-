import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Maximize, Volume2, MessageSquare, Users, Sparkles, BrainCircuit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

export default function OnlineClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [chat, setChat] = useState<{user: string, text: string}[]>([
    { user: 'Sarah AI', text: 'Welcome to this session on Prompt Engineering! Feel free to ask questions.' },
    { user: 'Student_12', text: 'Can we use zero-shot for data extraction?' }
  ]);
  const [input, setInput] = useState('');

  const sendMsg = () => {
    if (!input.trim()) return;
    setChat([...chat, { user: 'You', text: input }]);
    setInput('');
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:h-[calc(100vh-100px)] flex flex-col gap-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
         {/* Player Area */}
         <div className="flex-grow flex flex-col gap-4">
            <div className="aspect-video bg-black rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 ${isPlaying ? 'animate-pulse' : ''}`}>
                     <BrainCircuit className="w-10 h-10 text-primary" />
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between text-white">
                     <div className="flex items-center gap-6">
                        <SkipBack className="w-6 h-6 cursor-pointer hover:text-primary transition-colors" />
                        <button type="button" onClick={() => setIsPlaying(!isPlaying)} aria-label="Toggle playback">
                          {isPlaying ? (
                            <Pause className="w-8 h-8 cursor-pointer hover:text-primary transition-colors" />
                          ) : (
                            <Play className="w-8 h-8 cursor-pointer hover:text-primary transition-colors" />
                          )}
                        </button>
                        <SkipForward className="w-6 h-6 cursor-pointer hover:text-primary transition-colors" />
                     </div>
                     <div className="flex-grow mx-8 h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-primary shadow-[0_0_10px_#8b5cf6]"></div>
                     </div>
                     <div className="flex items-center gap-4">
                        <Volume2 className="w-6 h-6" />
                        <Maximize className="w-6 h-6" />
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <Badge className="bg-red-500 hover:bg-red-500 animate-pulse">LIVE</Badge>
                     <p className="text-xs font-bold text-muted-foreground italic tracking-widest uppercase">Chapter 4: Reasoning Chains</p>
                  </div>
                  <h1 className="text-2xl font-display font-bold">Advanced AI & Prompt Engineering Masterclass</h1>
               </div>
               <Button className="rounded-full shadow-lg shadow-primary/20" onClick={() => navigate(`/quiz/${id || 'course-1'}`)}>
                 <Sparkles className="w-4 h-4 mr-2" /> Take Quiz
               </Button>
            </div>
         </div>

         {/* Chat & Sidebar Info */}
         <div className="w-full lg:w-96 flex flex-col gap-6">
            <Card className="premium-card flex flex-col h-full overflow-hidden bg-card/60 backdrop-blur-xl">
               <CardHeader className="border-b p-6 bg-muted/30">
                  <CardTitle className="text-sm flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" /> Class Chat
                  </CardTitle>
               </CardHeader>
               <ScrollArea className="flex-grow p-4">
                  <div className="space-y-4">
                     {chat.map((m, i) => (
                       <div key={i} className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-tighter text-primary">{m.user}</p>
                          <p className="text-xs bg-muted/50 p-2 rounded-xl italic leading-snug">{m.text}</p>
                       </div>
                     ))}
                  </div>
               </ScrollArea>
               <div className="p-4 border-t bg-muted/10">
                  <div className="relative">
                    <Input 
                      placeholder="Type a message..." 
                      className="rounded-xl pr-12 focus:ring-1" 
                      value={input} 
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
                    />
                    <Button size="icon" variant="ghost" className="absolute right-1 top-1 h-8 w-8 text-primary" onClick={sendMsg}>
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
               </div>
            </Card>

            <Card className="premium-card bg-primary text-primary-foreground border-none shadow-xl shadow-primary/10">
               <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                     <Users className="w-6 h-6" />
                     <p className="text-xs font-bold">142 Watching Now</p>
                  </div>
                  <div className="h-px bg-white/20"></div>
                  <div className="space-y-1 text-center">
                     <p className="text-lg font-bold italic lowercase">royal_hall_01</p>
                     <p className="text-[10px] opacity-70 uppercase font-black">Global Campus</p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}

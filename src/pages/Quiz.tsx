import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COURSES } from '@/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, ArrowLeft, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions = [
    {
      question: "What does 'Chain of Thought' prompting mean?",
      options: [
        "A prompt that is linked to a database",
        "A technique where the model explains its reasoning step-by-step",
        "A way to train model on blockchain",
        "Encrypted prompts"
      ],
      correct: 1
    },
    {
      question: "Which of these is a valid way to reduce hallucinations in LLMs?",
      options: [
        "Increasing temperature to 2.0",
        "Using few-shot prompting with examples",
        "Asking the model to guess more",
        "Using very short prompts"
      ],
      correct: 1
    },
    {
      question: "What is 'Zero-Shot' prompting?",
      options: [
        "Providing zero examples in the prompt",
        "Providing dozens of examples",
        "Prompts with zero text",
        "A prompt with zero tokens"
      ],
      correct: 0
    }
  ];

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-2xl text-center space-y-8">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
           <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-12 h-12 text-primary" />
           </div>
           <h1 className="text-4xl font-display font-bold">Quiz Completed!</h1>
           <p className="text-muted-foreground italic">You've unlocked new insights and sharpened your skills.</p>
        </motion.div>

        <Card className="premium-card p-8 bg-primary text-primary-foreground">
           <div className="text-6xl font-black mb-2">{Math.round((score / questions.length) * 100)}%</div>
           <p className="font-bold opacity-80 uppercase tracking-widest text-xs">Final Score</p>
           <div className="mt-6 flex justify-center gap-4">
              <div className="text-center">
                 <p className="text-2xl font-bold">{score}</p>
                 <p className="text-[10px] opacity-70">Correct</p>
              </div>
              <div className="w-px bg-white/20"></div>
              <div className="text-center">
                 <p className="text-2xl font-bold">{questions.length - score}</p>
                 <p className="text-[10px] opacity-70">Incorrect</p>
              </div>
           </div>
        </Card>

        <div className="flex gap-4 justify-center">
           <Button variant="outline" className="rounded-full px-8" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
           <Button className="rounded-full px-8" onClick={() => navigate(`/courses/${id}`)}>Back to Course</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
         <Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-2" /> Exit Quiz</Button>
         <div className="flex items-center gap-4 flex-1 max-w-xs mx-8">
            <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
            <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">{currentQuestion + 1} of {questions.length}</span>
         </div>
      </div>

      <div className="space-y-6">
         <div className="space-y-2">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Knowledge Check</Badge>
            <h2 className="text-3xl font-display font-bold leading-tight">{questions[currentQuestion].question}</h2>
         </div>

         <div className="grid gap-4">
            {questions[currentQuestion].options.map((opt, i) => (
              <Button
                key={i}
                variant={selectedOption === i ? 'default' : 'outline'}
                className={`h-auto py-6 px-8 rounded-2xl justify-start text-left text-lg normal-case ${
                  selectedOption === i ? 'ring-2 ring-primary ring-offset-2' : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedOption(i)}
              >
                <div className="flex items-center w-full">
                   <span className={`w-8 h-8 rounded-full border flex items-center justify-center mr-4 text-xs font-bold ${
                     selectedOption === i ? 'bg-primary-foreground text-primary border-white' : 'bg-muted border-border'
                   }`}>
                      {String.fromCharCode(65 + i)}
                   </span>
                   <span className="flex-1">{opt}</span>
                   {selectedOption === i && <CheckCircle2 className="w-5 h-5 ml-2" />}
                </div>
              </Button>
            ))}
         </div>
      </div>

      <div className="flex justify-end">
         <Button 
           size="lg" 
           className="rounded-full px-12 text-lg font-bold shadow-xl shadow-primary/20" 
           disabled={selectedOption === null}
           onClick={handleNext}
         >
           {currentQuestion + 1 === questions.length ? 'Show Result' : 'Next Question'} <ArrowRight className="ml-2 w-5 h-5" />
         </Button>
      </div>
    </div>
  );
}

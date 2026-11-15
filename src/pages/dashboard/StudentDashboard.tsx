import { User, Course, Enrollment } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { MOCK_COURSES } from '@/mockData';

export default function StudentDashboard({ user }: { user: User | null }) {
  const [enrollments, setEnrollments] = useState<(Enrollment & { course: Course })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'enrollments'), where('userId', '==', user.id));
        const snapshot = await getDocs(q);
        const enrolledData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enrollment));
        
        // Fetch course details for each enrollment
        const fullData = await Promise.all(enrolledData.map(async (en) => {
          const courseDoc = await getDoc(doc(db, 'courses', en.courseId));
          const course = (courseDoc.exists() ? courseDoc.data() : MOCK_COURSES.find(c => c.id === en.courseId)) as Course;
          return { ...en, course };
        }));
        
        setEnrollments(fullData.filter(d => d.course));
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'enrollments');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-primary-foreground">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
             <h2 className="text-3xl font-display font-bold">Keep it up, {user.name}!</h2>
             <p className="opacity-90 max-w-md">You've completed 75% of your goals this week. Check your new recommendations below.</p>
          </div>
          <div className="flex gap-4">
             <Card className="bg-white/10 border-none text-white backdrop-blur-sm min-w-[120px]">
               <CardContent className="p-4 flex flex-col items-center">
                  <Zap className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-xl font-black">{user.xp || 0}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-70 font-bold">Total XP</span>
               </CardContent>
             </Card>
             <Card className="bg-white/10 border-none text-white backdrop-blur-sm min-w-[120px]">
               <CardContent className="p-4 flex flex-col items-center">
                  <Trophy className="w-5 h-5 text-amber-400 mb-1" />
                  <span className="text-xl font-black">{user.badges?.length || 0}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-70 font-bold">Badges</span>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: My Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold font-display">Continue Learning</h3>
             <Button variant="ghost" size="sm" render={<Link to="/courses" />}>
               View all <ArrowRight className="ml-2 w-4 h-4" />
             </Button>
          </div>

          <div className="grid gap-4">
            {loading ? (
              [1, 2].map(i => <Card key={i} className="h-32 animate-pulse bg-muted" />)
            ) : enrollments.length > 0 ? (
              enrollments.map((en) => (
                <Card key={en.id} className="premium-card overflow-hidden group">
                  <CardContent className="p-0 flex h-32">
                    <img src={en.course.thumbnail} className="w-40 object-cover h-full" alt={en.course.title} />
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="secondary" className="text-[10px] uppercase">{en.course.category}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" /> {en.course.duration}
                          </span>
                        </div>
                        <h4 className="font-bold line-clamp-1">{en.course.title}</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                           <span>Progress</span>
                           <span>{en.progress}%</span>
                        </div>
                        <Progress value={en.progress} className="h-1.5" />
                      </div>
                    </div>
                    <div className="p-4 flex items-center">
                       <Button size="icon" className="rounded-full bg-primary hover:scale-110 transition-transform shadow-lg shadow-primary/20" render={<Link to={`/courses/${en.courseId}`} />}>
                         <ArrowRight className="w-5 h-5" />
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-dashed py-12 text-center bg-transparent">
                 <CardContent className="flex flex-col items-center">
                   <BookOpen className="w-12 h-12 text-muted-foreground/30 mb-4" />
                   <p className="text-muted-foreground mb-4 italic">No courses joined yet. Let's find something exciting!</p>
                   <Button render={<Link to="/courses" />}>
                      Explore Marketplace
                   </Button>
                 </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="space-y-6">
           <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="w-5 h-5 text-primary mr-2" />
                  Recommended
                </CardTitle>
                <CardDescription>Based on your AI interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 {[
                   { title: 'Generative AI Masterclass', level: 'Beginner' },
                   { title: 'Python for Data Science', level: 'Intermediate' }
                 ].map((rec, i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border hover:bg-muted transition-colors cursor-pointer group">
                      <div className="space-y-0.5">
                         <p className="text-sm font-bold group-hover:text-primary transition-colors">{rec.title}</p>
                         <p className="text-[10px] text-muted-foreground uppercase font-bold">{rec.level}</p>
                      </div>
                      <PlusCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                   </div>
                 ))}
              </CardContent>
           </Card>

           <Card className="premium-card bg-primary text-primary-foreground shadow-xl shadow-primary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Skill Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-center">
                   <div className="w-20 h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center border-4 border-white/30 backdrop-blur-sm">
                      <GraduationCap className="w-10 h-10" />
                   </div>
                   <div>
                     <p className="font-bold">Next Milestone: AI Architect</p>
                     <p className="text-xs opacity-70">Complete 2 more courses to rank up.</p>
                   </div>
                   <Button variant="secondary" className="w-full rounded-full font-bold">View Path</Button>
                </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

const Award = Trophy;
const PlusCircle = Sparkles;

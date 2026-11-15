import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MOCK_COURSES } from '@/mockData';
import { Course, User, Enrollment } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  PlayCircle, 
  Clock, 
  Award, 
  Users, 
  BarChart, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Share2,
  Bookmark,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import AIChatbot from '@/components/AIChatbot';

export default function CourseDetail({ user }: { user: User | null }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const mock = MOCK_COURSES.find(c => c.id === id);
        setCourse(mock || null);

        if (user && id) {
          const enrollmentId = `${user.id}_${id}`;
          const enrollmentDoc = await getDoc(doc(db, 'enrollments', enrollmentId));
          setIsEnrolled(enrollmentDoc.exists());
        }
      } catch (error) {
        console.error('Error loading course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please login to enroll in courses');
      navigate('/login');
      return;
    }

    if (!course) return;

    try {
      const enrollmentId = `${user.id}_${course.id}`;
      const newEnrollment: Enrollment = {
        id: enrollmentId,
        userId: user.id,
        courseId: course.id,
        progress: 0,
        completedModules: [],
        enrolledAt: serverTimestamp() as any,
      };

      await setDoc(doc(db, 'enrollments', enrollmentId), newEnrollment);
      setIsEnrolled(true);
      toast.success('Successfully enrolled! Welcome to the course.');
    } catch (error) {
      toast.error('Enrollment failed. Please try again.');
    }
  };

  if (loading) return <div className="p-20 text-center">Loading course...</div>;
  if (!course) return <div className="p-20 text-center">Course not found.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Header */}
      <section className="relative py-16 lg:py-24 bg-muted/30 border-b overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
         <div className="container mx-auto px-4 relative z-10">
            <Link to="/courses" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Courses
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {course.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
                  {course.title}
                </h1>
                <p className="text-xl text-muted-foreground italic leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-6 text-sm font-medium text-muted-foreground">
                   <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary" /> {course.duration}</div>
                   <div className="flex items-center"><BarChart className="w-4 h-4 mr-2 text-primary" /> {course.level}</div>
                   <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-primary" /> 1.2k Students</div>
                   <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-primary" /> Updated May 2026</div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center -space-x-3">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                       </div>
                     ))}
                     <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                        +85
                     </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">Joined by our professional community</span>
                </div>
              </div>

              <div className="relative">
                 <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-background ring-1 ring-border"
                 >
                   <img src={course.thumbnail} className="w-full h-full object-cover" alt={course.title} />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer hover:bg-black/40 transition-colors">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                         <PlayCircle className="w-10 h-10 text-primary" />
                      </div>
                   </div>
                 </motion.div>
              </div>
            </div>
         </div>
      </section>

      {/* Course Content */}
      <section className="py-20">
         <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3 space-y-12">
               {/* Modules */}
               <div className="space-y-6">
                 <h2 className="text-2xl font-bold font-display flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-primary" />
                    Course Curriculum
                 </h2>
                 <Accordion type="single" collapsible className="w-full space-y-3">
                    {course.modules?.map((module, i) => (
                      <AccordionItem key={module.id} value={module.id} className="border rounded-2xl px-6 bg-card data-[state=open]:shadow-md transition-all overflow-hidden border-border/50">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center text-left">
                            <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold mr-4">{i + 1}</span>
                            <span className="font-bold">{module.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-muted-foreground italic leading-relaxed">
                          {module.content}
                          <div className="mt-4 flex items-center gap-4">
                             <Button size="sm" variant="outline" className="rounded-full" onClick={() => navigate(`/class/${course.id}`)}>
                               <PlayCircle className="w-4 h-4 mr-2" /> Start Video
                             </Button>
                             <span className="text-xs">15:30 mins</span>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                 </Accordion>
               </div>

               {/* Instructor */}
               <div className="p-8 rounded-[2rem] border bg-muted/20">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary" /> Your Instructor
                  </h3>
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background overflow-hidden shadow-lg">
                        <img src={`https://i.pravatar.cc/150?u=${course.instructorId}`} className="w-full h-full object-cover" alt={course.instructorName} />
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-lg font-bold">{course.instructorName}</h4>
                        <p className="text-sm text-primary font-medium italic">Senior AI Specialist at Royal College</p>
                        <p className="text-sm text-muted-foreground">Expert with 10+ years of experience in the industry.</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Sidebar Pricing & Actions */}
            <div className="lg:w-1/3 relative">
               <div className="sticky top-28 space-y-6">
                  <Card className="premium-card overflow-hidden rounded-[2.5rem] border-primary/20 shadow-2xl shadow-primary/10">
                     <CardHeader className="text-center p-8 bg-muted/30 border-b border-dashed">
                        <div className="text-4xl font-black text-primary mb-2">${course.price}</div>
                        <CardDescription className="italic font-medium">One-time payment for lifetime access</CardDescription>
                     </CardHeader>
                     <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                           {[
                             'Full Lifetime Access',
                             'Access on Mobile and Desktop',
                             'Certificate of Completion',
                             '35+ Downloadable Resources',
                             'AI Assistant Support'
                           ].map((feat, i) => (
                             <div key={i} className="flex items-center text-sm font-medium">
                               <CheckCircle2 className="w-4 h-4 mr-3 text-primary" /> {feat}
                             </div>
                           ))}
                        </div>
                        
                        {isEnrolled ? (
                          <Button className="w-full h-14 rounded-full text-lg font-bold" variant="secondary" onClick={() => navigate('/dashboard')}>
                            Go to Dashboard <ChevronRight className="ml-2 w-5 h-5" />
                          </Button>
                        ) : (
                          <Button className="w-full h-14 rounded-full text-lg font-bold shadow-lg shadow-primary/20" onClick={handleEnroll}>
                            Enroll Now <Sparkles className="ml-2 w-5 h-5" />
                          </Button>
                        )}

                        <Button variant="outline" className="w-full rounded-full" onClick={() => navigate(`/quiz/${course.id}`)}>
                          Practice Course Quiz
                        </Button>

                        <div className="flex gap-2">
                           <Button
                             variant="outline"
                             className="flex-1 rounded-2xl h-12"
                             onClick={() => {
                               navigator.clipboard?.writeText(window.location.href);
                               toast.success('Course link copied to clipboard!');
                             }}
                           >
                             <Share2 className="w-4 h-4 mr-2" /> Share
                           </Button>
                           <Button
                             variant={saved ? 'secondary' : 'outline'}
                             className="flex-1 rounded-2xl h-12"
                             onClick={() => {
                               setSaved(!saved);
                               toast.success(saved ? 'Removed from bookmarks' : 'Course saved to bookmarks!');
                             }}
                           >
                             <Bookmark className="w-4 h-4 mr-2" /> {saved ? 'Saved' : 'Save'}
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </section>

      {/* Floating Chatbot */}
      <AIChatbot context={`User is viewing the course: ${course.title}. ${course.description}`} />
    </div>
  );
}

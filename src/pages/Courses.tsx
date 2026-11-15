import { useState, useEffect } from 'react';
import { MOCK_COURSES } from '@/mockData';
import { Course } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Clock, Award, Filter, ArrowUpRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Courses() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [courses] = useState<Course[]>(MOCK_COURSES);

  const categories = ['All', 'AI & Data Science', 'Web Development', 'Graphic Designing', 'Cyber Security', 'Digital Marketing'];

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-12 min-h-screen">
      {/* Header & Filter */}
      <div className="space-y-8">
        <div className="max-w-2xl">
           <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight mb-4">
             Explore <span className="text-primary italic">Knowledge.</span>
           </h1>
           <p className="text-muted-foreground text-lg">Browse our catalog of professional courses designed to help you succeed in the digital economy.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between py-8 border-y">
           <div className="relative w-full lg:max-w-md">
             <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
             <Input 
               placeholder="Search courses, skills, or mentors..." 
               className="pl-10 h-12 rounded-2xl bg-muted/50 border-none ring-offset-background focus:ring-2 focus:ring-primary"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>

           <Tabs value={activeCategory} className="w-full lg:w-auto" onValueChange={setActiveCategory}>
             <TabsList className="bg-muted/50 p-1 h-auto flex-wrap justify-start">
               {categories.map(cat => (
                 <TabsTrigger key={cat} value={cat} className="rounded-xl px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all text-xs font-bold uppercase tracking-wider">
                   {cat}
                 </TabsTrigger>
               ))}
             </TabsList>
           </Tabs>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="premium-card h-full flex flex-col group overflow-hidden border-none shadow-none hover:bg-muted/30 transition-colors">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none px-2 py-0.5 text-[10px] font-bold uppercase">{course.level}</Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                   <Button variant="secondary" className="w-full rounded-full font-bold group" render={<Link to={`/courses/${course.id}`} />}>
                     Quick View <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                   </Button>
                </div>
              </div>
              
              <CardHeader className="px-0 pt-4 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-primary tracking-widest">
                  <span>{course.category}</span>
                  <span className="flex items-center text-muted-foreground"><Clock className="w-3 h-3 mr-1" /> {course.duration}</span>
                </div>
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 underline-offset-4 decoration-primary/30 group-hover:underline">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-4 grow">
                <p className="text-sm text-muted-foreground line-clamp-2 italic">{course.description}</p>
              </CardContent>
              <CardFooter className="px-0 py-4 flex items-center justify-between border-t border-dashed">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{course.instructorName}</span>
                 </div>
                 <div className="text-lg font-black text-primary">${course.price}</div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
         <div className="py-32 text-center space-y-4">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto" />
            <h3 className="text-2xl font-bold">No courses found</h3>
            <p className="text-muted-foreground italic">Try adjusting your filters or search terms.</p>
            <Button onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>Clear All Filters</Button>
         </div>
      )}
    </div>
  );
}

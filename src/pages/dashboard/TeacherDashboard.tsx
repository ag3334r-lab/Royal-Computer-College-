import { User, Course } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, BarChart, BookOpen, Clock, Settings, GraduationCap } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 400 },
  { name: 'Feb', revenue: 600 },
  { name: 'Mar', revenue: 500 },
  { name: 'Apr', revenue: 900 },
  { name: 'May', revenue: 1200 },
];

export default function TeacherDashboard({ user }: { user: User | null }) {
  if (!user) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-display font-bold italic tracking-tight">Teaching Studio</h2>
           <p className="text-muted-foreground italic text-sm">Empower your students with the latest AI knowledge.</p>
        </div>
        <Button className="rounded-full shadow-lg shadow-primary/20">
           <Plus className="w-4 h-4 mr-2" /> Create New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Students', value: '1,284', icon: Users, color: 'text-blue-500' },
           { label: 'Average Progress', value: '68%', icon: BarChart, color: 'text-emerald-500' },
           { label: 'Total Earnings', value: '$8,450', icon: GraduationCap, color: 'text-amber-500' },
         ].map((stat, i) => (
           <Card key={i} className="premium-card">
              <CardContent className="p-6 flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-black">{stat.value}</p>
                 </div>
                 <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                   <stat.icon className="w-6 h-6" />
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="premium-card lg:col-span-1">
            <CardHeader>
               <CardTitle className="text-lg">Student Enrollment Trend</CardTitle>
               <CardDescription>Monthly growth over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                     <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                     <Tooltip />
                     <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>

         <Card className="premium-card">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle className="text-lg">Recent Students</CardTitle>
                  <CardDescription>Latest enrollments in your courses</CardDescription>
               </div>
               <Button variant="ghost" size="sm">View all</Button>
            </CardHeader>
            <CardContent>
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>Student</TableHead>
                     <TableHead>Course</TableHead>
                     <TableHead>Date</TableHead>
                     <TableHead>Status</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {[
                     { name: 'John Doe', course: 'AI Masterclass', date: 'May 12', status: 'Active' },
                     { name: 'Alice Smith', course: 'Web Dev Pro', date: 'May 11', status: 'Active' },
                     { name: 'Bob Johnson', course: 'AI Masterclass', date: 'May 10', status: 'Completed' },
                     { name: 'Emma Wilson', course: 'Python Basics', date: 'May 09', status: 'Active' },
                   ].map((row, i) => (
                     <TableRow key={i}>
                       <TableCell className="font-medium text-xs">{row.name}</TableCell>
                       <TableCell className="text-xs text-muted-foreground">{row.course}</TableCell>
                       <TableCell className="text-xs">{row.date}</TableCell>
                       <TableCell>
                          <Badge variant={row.status === 'Completed' ? 'default' : 'secondary'} className="text-[10px] uppercase font-bold">
                             {row.status}
                          </Badge>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>

      <div className="space-y-6">
         <h3 className="text-xl font-bold font-display">My Courses</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <Card key={i} className="premium-card group overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all">
                 <CardContent className="p-0 flex h-40">
                    <img src="https://images.unsplash.com/photo-1677442136019?auto=format&fit=crop&q=80&w=400" className="w-1/3 object-cover h-full" alt="Course" />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                       <div className="space-y-1">
                          <div className="flex items-center justify-between">
                             <Badge variant="outline" className="text-[10px] uppercase">Active</Badge>
                             <span className="text-[10px] text-muted-foreground font-bold">452 Students</span>
                          </div>
                          <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Advanced Generative AI {i}</h4>
                       </div>
                       <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 rounded-xl">Edit</Button>
                          <Button size="sm" variant="outline" className="flex-1 rounded-xl text-primary">Preview</Button>
                       </div>
                    </div>
                 </CardContent>
              </Card>
            ))}
         </div>
      </div>
    </div>
  );
}

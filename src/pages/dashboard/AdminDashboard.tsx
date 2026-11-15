import { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  Settings, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  Mail,
  Search
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard({ user }: { user: User | null }) {
  if (!user) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-display font-bold italic tracking-tight">University Oversight</h2>
           <p className="text-muted-foreground italic text-sm">System administration and campus-wide analytics.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-full"><Mail className="w-4 h-4 mr-2" /> Global Notification</Button>
           <Button className="rounded-full shadow-lg shadow-primary/20"><Settings className="w-4 h-4 mr-2" /> System Preferences</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Users', value: '45,200', icon: Users, delta: '+12%' },
           { label: 'Active Courses', value: '342', icon: BookOpen, delta: '+5%' },
           { label: 'Course Revenue', value: '$124,500', icon: TrendingUp, delta: '+22%' },
           { label: 'System Health', value: 'Stable', icon: ShieldCheck, delta: '99.9%' },
         ].map((stat, i) => (
           <Card key={i} className="premium-card">
              <CardContent className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/20">{stat.delta}</Badge>
                 </div>
                 <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-black">{stat.value}</p>
                 </div>
              </CardContent>
           </Card>
         ))}
      </div>

      <Card className="premium-card overflow-hidden">
         <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-8 border-b bg-muted/20">
            <div className="space-y-1">
               <CardTitle className="text-xl">User Directory</CardTitle>
               <CardDescription>Manage all active students and instructors</CardDescription>
            </div>
            <div className="relative w-full md:w-72">
               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Filter by name or email..." className="pl-10 rounded-xl" />
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <Table>
               <TableHeader className="bg-muted/30">
                  <TableRow>
                     <TableHead className="px-8">User</TableHead>
                     <TableHead>Role</TableHead>
                     <TableHead>Joined Date</TableHead>
                     <TableHead>XP Level</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {[
                    { name: 'Dr. Sarah Chen', email: 'sarah@royal.edu', role: 'teacher', date: 'Jan 15, 2026', xp: 'Level 42' },
                    { name: 'Alex Rivera', email: 'alex@royal.edu', role: 'teacher', date: 'Feb 02, 2026', xp: 'Level 38' },
                    { name: 'John Learner', email: 'john@gmail.com', role: 'student', date: 'May 01, 2026', xp: 'Level 12' },
                    { name: 'Alice Smith', email: 'alice@yahoo.com', role: 'student', date: 'May 05, 2026', xp: 'Level 08' },
                    { name: 'Admin Root', email: 'admin@royal.edu', role: 'admin', date: 'Jan 01, 2026', xp: 'Max' },
                  ].map((user, i) => (
                    <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                       <TableCell className="px-8 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs">
                                {user.name.charAt(0)}
                             </div>
                             <div>
                                <p className="font-bold text-sm tracking-tight">{user.name}</p>
                                <p className="text-xs text-muted-foreground italic">{user.email}</p>
                             </div>
                          </div>
                       </TableCell>
                       <TableCell>
                          <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wide">
                             {user.role}
                          </Badge>
                       </TableCell>
                       <TableCell className="text-xs text-muted-foreground">{user.date}</TableCell>
                       <TableCell className="font-mono text-xs text-primary font-bold">{user.xp}</TableCell>
                       <TableCell>
                          <Button variant="ghost" size="sm" className="rounded-xl h-8">Modify</Button>
                       </TableCell>
                    </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
         <div className="p-4 border-t text-center">
            <Button variant="ghost" size="sm" className="text-xs italic text-muted-foreground">Show all 45,200 users</Button>
         </div>
      </Card>
      
      <div className="flex items-center justify-center p-8 bg-amber-500/5 rounded-[2rem] border border-amber-500/10">
         <div className="flex items-center gap-4 text-amber-600">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium italic">3 system security alerts require your attention. Check server logs for details.</p>
         </div>
      </div>
    </div>
  );
}

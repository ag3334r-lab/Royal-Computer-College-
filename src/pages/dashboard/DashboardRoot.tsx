import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Settings, 
  Users, 
  PlusCircle, 
  BarChart, 
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  roles: string[];
}

const navigation: SidebarItem[] = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, roles: ['student', 'teacher', 'admin'] },
  { name: 'My Courses', href: '/dashboard/courses', icon: BookOpen, roles: ['student'] },
  { name: 'Certificates', href: '/dashboard/certificates', icon: GraduationCap, roles: ['student'] },
  { name: 'My Teaching', href: '/dashboard/teacher', icon: PlusCircle, roles: ['teacher', 'admin'] },
  { name: 'Manage Users', href: '/dashboard/admin', icon: Users, roles: ['admin'] },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart, roles: ['admin', 'teacher'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['student', 'teacher', 'admin'] },
];

export default function DashboardRoot({ user }: { user: User | null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const filteredNav = navigation.filter(item => item.roles.includes(user.role));

  const NavContent = () => (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8">
        <h2 className="text-xl font-display font-bold text-primary italic">Dashboard</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {filteredNav.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pt-6 border-t">
        <Button variant="ghost" onClick={handleLogout} className="w-full justify-start px-4 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl">
          <LogOut className="w-5 h-5 mr-3" />
          Log out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-muted/20 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col border-r bg-background">
        <NavContent />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-background/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
             <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
               <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
                  <Menu className="h-6 w-6" />
               </SheetTrigger>
               <SheetContent side="left" className="p-0 w-72">
                 <NavContent />
               </SheetContent>
             </Sheet>
             <h1 className="text-sm font-medium text-muted-foreground">
               Welcome back, <span className="text-foreground font-bold">{user.name}</span>
             </h1>
          </div>
          
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="relative text-muted-foreground">
               <Bell className="h-5 w-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
             </Button>
             <div className="h-8 w-[1px] bg-border hidden sm:block"></div>
             <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                   <p className="text-xs font-bold">{user.name}</p>
                   <p className="text-[10px] text-muted-foreground capitalize">{user.role}</p>
                </div>
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
             </div>
          </div>
        </header>

        {/* Dashboard Pages */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
           <div className="container mx-auto">
             <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocFromServer, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';
import { User } from './types';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Layout } from 'lucide-react';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import DashboardRoot from './pages/dashboard/DashboardRoot';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Quiz from './pages/Quiz';
import OnlineClass from './pages/OnlineClass';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ id: firebaseUser.uid, ...userDoc.data() } as User);
        } else {
          // Initialize new user
          const newUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Learner',
            email: firebaseUser.email || '',
            role: 'student',
            profileImage: firebaseUser.photoURL || '',
            createdAt: serverTimestamp() as any,
            xp: 0,
            badges: [],
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-primary rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar user={user} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/class/:id" element={<OnlineClass />} />
            <Route path="/dashboard" element={<DashboardRoot user={user} />}>
              <Route index element={<StudentDashboard user={user} />} />
              <Route path="student" element={<StudentDashboard user={user} />} />
              <Route path="teacher" element={<TeacherDashboard user={user} />} />
              <Route path="admin" element={<AdminDashboard user={user} />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

function Navbar({ user }: { user: User | null }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold italic">R</div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:inline-block">
            Royal <span className="text-primary italic">College</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className={location.pathname === '/' ? 'text-primary' : 'hover:text-primary transition-colors'}>Home</Link>
          <Link to="/courses" className={location.pathname === '/courses' ? 'text-primary' : 'hover:text-primary transition-colors'}>Courses</Link>
          {user && <Link to="/dashboard" className={location.pathname.startsWith('/dashboard') ? 'text-primary' : 'hover:text-primary transition-colors'}>Dashboard</Link>}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-8 w-8 rounded-full" />}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link to="/dashboard" />}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem render={<Link to="/dashboard/settings" />}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Button variant="ghost" render={<Link to="/login" />}>Login</Button>
              <Button render={<Link to="/register" />}>Join Free</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold italic">R</div>
            <span className="font-display font-bold text-xl tracking-tight">Royal College</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Building the next generation of AI and Computer experts with professional, hands-on learning.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/courses" className="hover:text-foreground">All Courses</Link></li>
            <li><Link to="/certificates" className="hover:text-foreground">Certificates</Link></li>
            <li><Link to="/teachers" className="hover:text-foreground">Become a Teacher</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">About Us</a></li>
            <li><a href="#" className="hover:text-foreground">Careers</a></li>
            <li><a href="#" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Help Center</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Royal Computer College. All rights reserved. Inspired by Google Skills.
      </div>
    </footer>
  );
}

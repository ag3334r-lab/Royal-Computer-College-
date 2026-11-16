import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import { User } from '@/types';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      await updateProfile(firebaseUser, { displayName: name });

      const userRef = doc(db, 'users', firebaseUser.uid);
      const existingSnap = await getDoc(userRef);

      if (existingSnap.exists()) {
        await updateDoc(userRef, { name });
      } else {
        const newUser: User = {
          id: firebaseUser.uid,
          name,
          email,
          role: 'student',
          createdAt: serverTimestamp() as any,
          xp: 0,
          badges: [],
        };
        await setDoc(userRef, newUser);
      }
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex grow items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md border-border/50 shadow-xl overflow-hidden rounded-3xl">
        <div className="h-2 bg-primary"></div>
        <CardHeader className="space-y-1 text-center pt-8">
          <CardTitle className="text-3xl font-display font-bold italic">Join Royal College</CardTitle>
          <CardDescription>Start your journey into AI and Modern Skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="pl-10 rounded-xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email address"
                  className="pl-10 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Create Password"
                  className="pl-10 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button className="w-full rounded-full py-6 text-lg font-bold" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : <><UserPlus className="w-4 h-4 mr-2" /> Sign Up</>}
            </Button>
          </form>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline italic">
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

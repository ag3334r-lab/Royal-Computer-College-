import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Award, Users, BookOpen, Brain, Zap, Globe, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
           <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
           <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-4 py-1.5 border-primary/20 text-primary bg-primary/5 mb-6">
                <Sparkles className="w-3.5 h-3.5 mr-2 inline" />
                AI-Powered Learning Platform
              </Badge>
              <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Build Your Future with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  Royal Computer College
                </span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                Learn AI, Programming, Designing & Digital Skills with professional courses designed for the modern world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="rounded-full px-8 text-lg hover:scale-105 transition-transform" render={<Link to="/courses" />}>
                Start Learning
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-lg" render={<Link to="/courses" />}>
                Explore Courses
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Enrolled Students', value: '45,000+', icon: Users },
              { label: 'Expert Teachers', value: '120+', icon: Award },
              { label: 'Active Courses', value: '350+', icon: BookOpen },
              { label: 'Success Rate', value: '98%', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-background rounded-xl shadow-sm border">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold">Featured Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto italic">Explore our wide range of professional computer and AI courses.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'AI & Machine Learning', icon: Brain, color: 'bg-blue-500' },
              { title: 'Web Development', icon: Globe, color: 'bg-emerald-500' },
              { title: 'Graphic Designing', icon: zap, color: 'bg-amber-500' },
              { title: 'Cyber Security', icon: Shield, color: 'bg-rose-500' },
              { title: 'Digital Marketing', icon: Rocket, color: 'bg-indigo-500' },
              { title: 'App Development', icon: Sparkles, color: 'bg-violet-500' },
            ].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-3xl border bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl ${cat.color}/10 flex items-center justify-center mb-6`}>
                   {cat.icon && <cat.icon className={`w-6 h-6 ${cat.color.replace('bg-', 'text-')}`} />}
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{cat.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground italic">Master the latest tools and technologies in {cat.title.toLowerCase()}.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted/50 rounded-[4rem] mx-4 mb-24">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
              Why Choose <br /> Royal College?
            </h2>
            <p className="text-lg text-muted-foreground">
              We provide a modern learning experience with state-of-the-art curriculum and AI-assisted personalized paths.
            </p>
            
            <div className="space-y-6">
              {[
                { title: 'Industry Recognized Certificates', icon: Award },
                { title: 'Learn from Leading Experts', icon: Users },
                { title: 'Flexible Schedule & Lifetime Access', icon: BookOpen },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">Premium quality education that fits your lifestyle.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
             <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center overflow-hidden border">
                <div className="absolute inset-0 flex items-center justify-center">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                     className="w-3/4 h-3/4 border-4 border-dashed border-primary/20 rounded-full flex items-center justify-center"
                   >
                     <Brain className="w-32 h-32 text-primary opacity-20" />
                   </motion.div>
                </div>
                <div className="relative z-10 text-center p-12">
                   <div className="text-8xl font-bold font-display opacity-10 mb-4">SKILLS</div>
                   <h3 className="text-2xl font-bold italic">Shape your future with AI</h3>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const zap = Zap;

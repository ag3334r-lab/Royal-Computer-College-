import { Course } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Advanced AI & Prompt Engineering',
    description: 'Master the art of communicating with Large Language Models. Learn how to build sophisticated prompts for Gemini, GPT-4, and more.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    category: 'AI & Data Science',
    price: 49.99,
    instructorId: 'inst-1',
    instructorName: 'Dr. Sarah Chen',
    level: 'Intermediate',
    duration: '12h 45m',
    createdAt: new Date().toISOString(),
    modules: [
      { id: 'm1', title: 'Introduction to LLMs', content: 'Basics of model architectures.', videoUrl: '#' },
      { id: 'm2', title: 'Zero-Shot vs Few-Shot', content: 'Exploring different prompting styles.', videoUrl: '#' },
      { id: 'm3', title: 'Chain of Thought Prompting', content: 'Advanced reasoning techniques.', videoUrl: '#' }
    ]
  },
  {
    id: 'course-2',
    title: 'Full-Stack Web Development React + Node',
    description: 'Go from zero to hero in modern web development. Learn React, Node.js, Express, and MongoDB in a hands-on project-based course.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    category: 'Web Development',
    price: 39.99,
    instructorId: 'inst-2',
    instructorName: 'Alex Rivera',
    level: 'Beginner',
    duration: '45h 20m',
    createdAt: new Date().toISOString(),
    modules: [
      { id: 'm1', title: 'Phase 1: React Fundamentals', content: 'Hooks, State, Props.', videoUrl: '#' },
      { id: 'm2', title: 'Phase 2: Express Backend', content: 'Building robust APIs.', videoUrl: '#' }
    ]
  },
  {
    id: 'course-3',
    title: 'Professional Graphic Designing with AI',
    description: 'Learn design fundamentals and how to use AI tools like Midjourney and DALL-E to speed up your workflow.',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    category: 'Graphic Designing',
    price: 29.99,
    instructorId: 'inst-3',
    instructorName: 'Jordan Smith',
    level: 'Beginner',
    duration: ' sampling',
    createdAt: new Date().toISOString(),
    modules: [
      { id: 'm1', title: 'Color Theory & Layout', content: 'The basics of great design.', videoUrl: '#' }
    ]
  },
  {
    id: 'course-4',
    title: 'Cyber Security: ethical Hacking 101',
    description: 'Understand the world of cyber security. Learn how to protect systems and stay safe online.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: 'Cyber Security',
    price: 59.99,
    instructorId: 'inst-1',
    instructorName: 'Dr. Sarah Chen',
    level: 'Advanced',
    duration: '22h 10m',
    createdAt: new Date().toISOString(),
    modules: []
  }
];

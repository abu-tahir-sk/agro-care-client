'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  CheckCircle2,
  HelpCircle,
  PlusCircle,
  Stethoscope,
  Send,
  Sparkles,
} from 'lucide-react';

interface Post {
  id: string;
  author: string;
  role: string;
  location: string;
  time: string;
  title: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  hasExpertAnswer?: boolean;
  expertAnswer?: {
    expertName: string;
    designation: string;
    answer: string;
    time: string;
  };
}

export default function FarmerCommunityPage() {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'p-1',
      author: 'বিপ্লব মণ্ডল',
      role: 'কৃষক',
      location: 'মঙ্গলকোট, পূর্ব বর্ধমান',
      time: '২ ঘণ্টা পূর্বে',
      title: 'আলু গাছের গোড়া পচে গাছ ঢলে পড়ছে — কী ওষুধ দিলে কাজ হবে?',
      content:
        'কুফরি জ্যোতি জাতের আলুর বয়স ৩৫ দিন। গত দুই দিনের কুয়াশায় বেশ কিছু গাছের গোড়া নরম হয়ে কালচে দাগ হয়ে গেছে। অভিজ্ঞ কৃষক ভাইয়েরা ও কৃষি বিশেষজ্ঞ স্যার একটু সমাধান দিলে উপকৃত হবো।',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80',
      likes: 18,
      commentsCount: 6,
      hasExpertAnswer: true,
      expertAnswer: {
        expertName: 'ড. শুভাশিস রায়',
        designation: 'উদ্ভিদ রোগতত্ত্ব বিভাগ, BCKV',
        answer:
          'এটি আলু ফসলের নাবি ধসা (Late Blight) বা স্ক্লেরোটিয়াম গোড়া পচা রোগের প্রাথমিক লক্ষণ। দেরি না করে প্রতি লিটার জলে ২ গ্রাম রিডোমিল গোল্ড (Metalaxyl + Mancozeb) বা ২.৫ গ্রাম ম্যানকোজেব ৭৫% ডব্লিউপি স্প্রে করুন। জমিতে জল জমতে দেবেন না।',
        time: '১ ঘণ্টা পূর্বে',
      },
    },
    {
      id: 'p-2',
      author: 'তারকনাথ মাঝি',
      role: 'কৃষক',
      location: 'মেমারী, বর্ধমান',
      time: '৫ ঘণ্টা পূর্বে',
      title: 'স্বর্ণা-সাব১ আমন ধানের ফলন এবার কেমন হতে পারে?',
      content:
        'বন্যার জল জমেছিল ১০ দিন, তবুও গাছ অক্ষত রয়েছে। শীষ আসার মুখে কোন সার স্প্রে করলে দানা পুষ্ট ও চকচকে হবে?',
      likes: 24,
      commentsCount: 9,
      hasExpertAnswer: true,
      expertAnswer: {
        expertName: 'ড. শুভাশিস রায়',
        designation: 'কৃষি বিশেষজ্ঞ, AgroCare প্যানেল',
        answer:
          'ফুল আসার শেষ ধাপে ০:০:৫০ (পটাশিয়াম সালফেট) প্রতি লিটার জলে ৫ গ্রাম এবং সাথে বোরন ২০% ১ গ্রাম মিশিয়ে বিকেলের দিকে স্প্রে করুন। শীষের সমস্ত দানা পুষ্ট হবে এবং চিটা হবে না।',
        time: '৩ ঘণ্টা পূর্বে',
      },
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: user?.name || 'অনামী কৃষক',
      role: 'কৃষক',
      location: user?.location || 'পশ্চিমবঙ্গ',
      time: 'এখনই',
      title: newTitle,
      content: newContent,
      likes: 1,
      commentsCount: 0,
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowModal(false);
  };

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4EBE5]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16834A]/10 text-[#106B3B] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#16834A]" />
            <span>{t('কৃষক সম্প্রদায় ও ফোরাম', 'Farmer Community & Forum')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17251C]">
            {t('কৃষক মতামত ও বিশেষজ্ঞ প্রশ্নোত্তর হাব', 'Bengal Farmer Discussion & Expert Advice')}
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-[#16834A] hover:bg-[#106B3B] text-white text-xs font-bold shadow-soft transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('প্রশ্ন জিজ্ঞাসা করুন', 'Ask Question')}</span>
        </button>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-[#E4EBE5] p-6 sm:p-8 shadow-card space-y-5"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E9F6EE] text-[#16834A] font-bold text-sm flex items-center justify-center">
                  {post.author.slice(0, 1)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#17251C]">{post.author}</h4>
                  <p className="text-[10px] text-[#68766D]">{post.location} • {post.time}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#16834A] bg-[#E9F6EE] px-2 py-0.5 rounded-full">
                {post.role}
              </span>
            </div>

            {/* Post Content */}
            <div className="space-y-3">
              <h3 className="text-base font-black text-[#17251C] leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-[#68766D] leading-relaxed">
                {post.content}
              </p>
              {post.image && (
                <div className="rounded-2xl overflow-hidden max-h-72 border border-[#E4EBE5]">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Expert Verified Solution Box */}
            {post.hasExpertAnswer && post.expertAnswer && (
              <div className="p-5 bg-gradient-to-br from-[#E9F6EE] to-[#E9F6EE]/60 rounded-2xl border border-[#16834A]/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#16834A]/20">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#16834A] text-white flex items-center justify-center">
                      <Stethoscope className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-[#17251C] flex items-center gap-1">
                        {post.expertAnswer.expertName}
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A]" />
                      </span>
                      <p className="text-[10px] text-[#68766D]">{post.expertAnswer.designation}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-[#106B3B] bg-white px-2 py-0.5 rounded-full shadow-sm">
                    {t('যাচাইকৃত সমাধান (Verified)', 'Verified Solution')}
                  </span>
                </div>
                <p className="text-xs text-[#17251C] leading-relaxed font-medium">
                  {post.expertAnswer.answer}
                </p>
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E4EBE5] text-xs text-[#68766D]">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 hover:text-[#16834A] font-bold transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes} {t('উপকারী', 'Helpful')}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>{post.commentsCount} {t('মন্তব্য', 'Comments')}</span>
              </div>

              <button
                onClick={() => alert(t('লিংক কপি করা হয়েছে!', 'Link copied to clipboard!'))}
                className="flex items-center gap-1.5 hover:text-[#16834A] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{t('শেয়ার', 'Share')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Question Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4EBE5]">
              <h3 className="text-base font-black text-[#17251C]">
                {t('নতুন প্রশ্ন পোস্ট করুন', 'Ask a Farming Question')}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-xs text-[#68766D] hover:text-[#17251C] font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[#17251C]">{t('শিরোনাম বা ফসলের সমস্যা:', 'Title:')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('উদা: বেগুনের ডগা ও ফল ছিদ্রকারী পোকা দমনে কী স্প্রে করব?', 'e.g. How to control brinjal fruit borer?')}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#17251C]">{t('বিস্তারিত বর্ণনা ও লক্ষণ:', 'Detailed Description:')}</label>
                <textarea
                  required
                  rows={4}
                  placeholder={t('গাছের বয়স, লক্ষণ ও পূর্ববর্তী কোনো স্প্রে করে থাকলে লিখুন...', 'Explain symptoms, age of crop...')}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E4EBE5] focus:outline-none focus:border-[#16834A] text-xs font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#E4EBE5] text-[#68766D] font-bold hover:bg-slate-50"
                >
                  {t('বাতিল', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#16834A] hover:bg-[#106B3B] text-white font-bold shadow-soft flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('পোস্ট করুন', 'Publish Post')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


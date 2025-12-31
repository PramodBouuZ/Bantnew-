
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS as initialBlogs } from '../constants';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('marketplaceBlogs');
    setBlogs(saved ? JSON.parse(saved) : initialBlogs);
    document.title = "Insights & Resources | BantConfirm";
  }, []);

  return (
    <div className="pt-48 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">BANT Knowledge Base</span>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Insights & AI Business Resources</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">Deep insights, tutorials, and industry trends to help you scale your B2B procurement strategies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogs.map(post => (
            <Link to={`/blog/${post.slug}`} key={post.id} className="group">
              <div className="bg-white rounded-[50px] border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
                <div className="h-80 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-indigo-700 shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">{post.date} • By {post.author}</p>
                  <h2 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors leading-tight">{post.title}</h2>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8">{post.excerpt}</p>
                  <div className="mt-auto flex items-center gap-2 text-indigo-600 font-black group-hover:gap-4 transition-all uppercase text-xs">
                    Read Article <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

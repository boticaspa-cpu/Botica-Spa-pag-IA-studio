import React from 'react';
import { motion } from 'motion/react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { SEO } from '../components/SEO';

export function BlogPost() {
  const { id } = useParams();
  const { t } = useLanguage();
  
  const post = t.blog.posts.find((p: any) => p.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-32 pb-24">
      <SEO
        title={`${post.title} | Botica Spa`}
        description={post.excerpt}
        url={`https://boticaspa.com/blog/${post.id}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://boticaspa.com/' },
          { name: 'Blog', url: 'https://boticaspa.com/blog' },
          { name: post.title, url: `https://boticaspa.com/blog/${post.id}` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": { "@type": "Organization", "name": "Botica Spa" },
        "publisher": {
          "@type": "Organization",
          "name": "Botica Spa",
          "logo": { "@type": "ImageObject", "url": "https://boticaspa.com/logo.png" }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://boticaspa.com/blog/${post.id}` },
        "image": post.image ? `https://boticaspa.com${post.image}` : "https://boticaspa.com/og-image.webp"
      })}} />
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-[#5A5A40] hover:gap-5 transition-all"
          >
            <ArrowLeft className="w-3 h-3" />
            {t.blog.backToBlog}
          </Link>
        </motion.div>

        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold mb-6"
          >
            <Calendar className="w-4 h-4" />
            {post.date}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-[#1A1A1A] leading-tight mb-8"
          >
            {post.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 italic font-serif leading-relaxed"
          >
            {post.excerpt}
          </motion.p>
        </header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="aspect-[16/9] rounded-3xl overflow-hidden mb-16 shadow-2xl"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg max-w-none prose-serif"
        >
          <div className="text-gray-700 leading-relaxed space-y-8 text-lg">
            {post.content.split('\n').map((paragraph: string, i: number) => (
              paragraph.trim() && <p key={i}>{paragraph.trim()}</p>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Share</span>
            <button className="p-2 rounded-full hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4 text-[#1A1A1A]" />
            </button>
          </div>
          
          <Link 
            to="/blog" 
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:text-[#5A5A40] transition-colors"
          >
            {t.blog.backToBlog}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

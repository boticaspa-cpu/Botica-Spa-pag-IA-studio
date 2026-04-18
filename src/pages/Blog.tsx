import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { ArrowRight, Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Blog() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24">
      <SEO
        title="Wellness Blog | Spa Tips & Guides | Botica Spa Riviera Maya"
        description="Expert tips on in home wellness, massage therapy, aromatherapy, and spa preparation for your stay in Playa del Carmen, Tulum, and Cancún."
        url="https://boticaspa.com/blog"
      />
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold mb-4 block"
          >
            {t.blog.badge}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-[#1A1A1A]"
          >
            {t.blog.title}
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {t.blog.posts.map((post: any, index: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold mb-3">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                
                <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4 group-hover:text-[#5A5A40] transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] group-hover:gap-4 transition-all">
                  {t.blog.readMore}
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

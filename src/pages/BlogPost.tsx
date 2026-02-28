import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { ModernNavigation } from '@/components/ui/modern-navigation';
import { Footer } from '@/components/sections/Footer';
import { blogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { SEOHead } from '@/components/seo/SEOHead';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: url,
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
          <Link to="/blog">
            <Button>Voltar para o blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const articleUrl = `https://ruraltime.com.br/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        ogImage={typeof post.imageUrl === 'string' && post.imageUrl.startsWith('http') ? post.imageUrl : `https://ruraltime.com.br${post.imageUrl}`}
        author={post.author}
        publishedTime={post.date}
        modifiedTime={post.date}
        section={post.category}
        tags={post.tags}
      />

      <SchemaMarkup
        type="newsArticle"
        headline={post.title}
        description={post.excerpt}
        image={typeof post.imageUrl === 'string' && post.imageUrl.startsWith('http') ? post.imageUrl : `https://ruraltime.com.br${post.imageUrl}`}
        datePublished={post.date}
        dateModified={post.date}
        author={post.author}
        url={articleUrl}
        section={post.category}
      />

      <SchemaMarkup
        type="breadcrumb"
        items={[
          { name: 'Rural Time', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` }
        ]}
      />

      <ModernNavigation onSectionClick={scrollToSection} />
      
      {/* Hero Section */}
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Voltar para o blog
          </Link>

          {/* Header */}
          <header className="max-w-4xl mx-auto mb-12">
            <Badge className="mb-4">{post.category}</Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{post.readTime} de leitura</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 size={18} />
                Compartilhar
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <div key={tag} className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm">
                  <Tag size={14} />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          <figure className="max-w-5xl mx-auto mb-12">
            <img
              src={post.imageUrl}
              alt={`${post.title} - Artigo sobre ${post.category} no turismo rural brasileiro`}
              className="w-full rounded-xl shadow-lg"
              loading="eager"
            />
          </figure>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-strong:text-foreground prose-ul:text-foreground/90 prose-ol:text-foreground/90"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />

            {/* Author Info */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                  RT
                </div>
                <div>
                  <p className="font-semibold text-lg">{post.author}</p>
                  <p className="text-muted-foreground">
                    Conteúdo informativo sobre turismo rural e desenvolvimento do campo brasileiro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Artigos Relacionados
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  to={`/blog/${relatedPost.slug}`}
                  className="group"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="bg-background rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={relatedPost.imageUrl}
                      alt={`${relatedPost.title} - Artigo sobre turismo rural`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <Badge className="mb-3">{relatedPost.category}</Badge>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer onSectionClick={scrollToSection} />
    </div>
  );
}

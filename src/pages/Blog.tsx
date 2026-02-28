import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { ModernNavigation } from '@/components/ui/modern-navigation';
import { Footer } from '@/components/sections/Footer';
import { blogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/SEOHead';
import { SchemaMarkup } from '@/components/seo/SchemaMarkup';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog sobre Turismo Rural no Brasil | Artigos e Notícias"
        description="Blog sobre turismo rural no Brasil, CNA, SENAR, CNA Jovem e desenvolvimento do campo. Artigos informativos sobre experiências rurais, capacitação e agronegócio."
        keywords="blog turismo rural, turismo rural brasil, CNA, SENAR, CNA jovem, agronegócio, desenvolvimento rural, experiências rurais"
        canonicalUrl="/blog"
        ogType="website"
      />

      <SchemaMarkup
        type="webPage"
        name="Blog sobre Turismo Rural no Brasil"
        description="Artigos e notícias sobre turismo rural, CNA, SENAR e desenvolvimento do campo brasileiro."
        url="/blog"
      />

      <SchemaMarkup
        type="breadcrumb"
        items={[
          { name: 'Rural Time', url: '/' },
          { name: 'Blog', url: '/blog' }
        ]}
      />
      
      <ModernNavigation onSectionClick={scrollToSection} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-glow to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Blog Rural Time
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Conteúdos sobre turismo rural, desenvolvimento do campo, capacitação profissional e o futuro do agronegócio brasileiro
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.imageUrl}
                    alt={`${post.title} - Artigo sobre turismo rural no Brasil`}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('pt-BR')}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <CardDescription className="text-base line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <div key={tag} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Tag size={12} />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Link to={`/blog/${post.slug}`} className="w-full">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Ler mais
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                Nenhuma postagem encontrada nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer onSectionClick={scrollToSection} />
    </div>
  );
}

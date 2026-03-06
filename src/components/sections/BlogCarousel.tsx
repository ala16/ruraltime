import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/contexts/LanguageContext";

export const BlogCarousel = () => {
  const { t } = useLanguage();
  const latestPosts = blogPosts.slice(0, 6);

  return (
    <section className="py-8 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">{t('blog.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">{t('blog.subtitle')}</p>
          <Link to="/blog">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 hover:scale-105 transition-transform duration-300 shadow-glow">
              {t('blog.viewAll')}
            </Button>
          </Link>
        </div>

        <Carousel plugins={[Autoplay({ delay: 4000 })]} className="w-full" opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {latestPosts.map((post, index) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:scale-[1.02]">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded-full font-semibold">{post.category}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-semibold mb-1 line-clamp-2">{post.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-white/80">
                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /><span>{new Date(post.date).toLocaleDateString('pt-BR')}</span></div>
                        <div className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{post.readTime}</span></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

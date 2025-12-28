import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = 'https://ruraltime.com.br/lovable-uploads/rural-time-logo-new.png',
  ogType = 'website',
  author = 'Rural Time',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
}: SEOHeadProps) => {
  const siteUrl = 'https://ruraltime.com.br';
  const fullCanonical = canonicalUrl?.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl || ''}`;
  const fullTitle = title.includes('Rural Time') ? title : `${title} | Rural Time`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} 
      />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rural Time" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Article specific OG tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {ogType === 'article' && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@ruraltime" />
      
      {/* Google News specific */}
      {ogType === 'article' && (
        <>
          <meta name="news_keywords" content={tags.join(', ')} />
          <meta name="syndication-source" content={fullCanonical} />
          <meta name="original-source" content={fullCanonical} />
        </>
      )}
    </Helmet>
  );
};

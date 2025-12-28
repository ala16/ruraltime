import { Helmet } from 'react-helmet-async';

interface OrganizationSchemaProps {
  type: 'organization';
}

interface LocalBusinessSchemaProps {
  type: 'localBusiness';
  name: string;
  description: string;
  address: {
    city: string;
    state: string;
    street?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  image?: string;
  priceRange?: string;
  telephone?: string;
}

interface TouristAttractionSchemaProps {
  type: 'touristAttraction';
  name: string;
  description: string;
  address: {
    city: string;
    state: string;
  };
  image?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
}

interface ArticleSchemaProps {
  type: 'article';
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

interface NewsArticleSchemaProps {
  type: 'newsArticle';
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
  section?: string;
}

interface BreadcrumbSchemaProps {
  type: 'breadcrumb';
  items: Array<{
    name: string;
    url: string;
  }>;
}

interface WebPageSchemaProps {
  type: 'webPage';
  name: string;
  description: string;
  url: string;
}

type SchemaProps = 
  | OrganizationSchemaProps 
  | LocalBusinessSchemaProps 
  | TouristAttractionSchemaProps 
  | ArticleSchemaProps
  | NewsArticleSchemaProps
  | BreadcrumbSchemaProps
  | WebPageSchemaProps;

const siteUrl = 'https://ruraltime.com.br';

const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  "name": "Rural Time",
  "alternateName": "Rural Time - Turismo Rural Digital",
  "description": "O maior portal de turismo rural do Brasil. Conectamos turistas a experiências autênticas no campo brasileiro.",
  "url": siteUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}/lovable-uploads/rural-time-logo-new.png`,
    "width": 600,
    "height": 60
  },
  "image": `${siteUrl}/lovable-uploads/rural-time-logo-new.png`,
  "sameAs": [
    "https://instagram.com/ruraltime",
    "https://facebook.com/ruraltime"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Portuguese", "English", "Spanish"]
  },
  "areaServed": {
    "@type": "Country",
    "name": "Brazil"
  },
  "slogan": "O maior portal de turismo rural do Brasil",
  "knowsAbout": [
    "Turismo Rural",
    "Agroturismo",
    "Experiências no Campo",
    "Fazendas Turísticas",
    "Hospedagem Rural"
  ]
});

const getLocalBusinessSchema = (props: LocalBusinessSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "additionalType": "LocalBusiness",
  "name": props.name,
  "description": props.description,
  "image": props.image,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": props.address.street,
    "addressLocality": props.address.city,
    "addressRegion": props.address.state,
    "addressCountry": "BR"
  },
  ...(props.geo && {
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": props.geo.latitude,
      "longitude": props.geo.longitude
    }
  }),
  "priceRange": props.priceRange || "$$",
  "telephone": props.telephone,
  "isAccessibleForFree": false,
  "publicAccess": true
});

const getTouristAttractionSchema = (props: TouristAttractionSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": props.name,
  "description": props.description,
  "image": props.image,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": props.address.city,
    "addressRegion": props.address.state,
    "addressCountry": "BR"
  },
  ...(props.geo && {
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": props.geo.latitude,
      "longitude": props.geo.longitude
    }
  }),
  "touristType": ["Rural Tourism", "Eco Tourism", "Agritourism"],
  "isAccessibleForFree": false
});

const getArticleSchema = (props: ArticleSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": props.url
  },
  "headline": props.headline,
  "description": props.description,
  "image": props.image,
  "datePublished": props.datePublished,
  "dateModified": props.dateModified || props.datePublished,
  "author": {
    "@type": "Person",
    "name": props.author,
    "url": siteUrl
  },
  "publisher": {
    "@type": "Organization",
    "name": "Rural Time",
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/lovable-uploads/rural-time-logo-new.png`
    }
  }
});

const getNewsArticleSchema = (props: NewsArticleSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": props.url
  },
  "headline": props.headline,
  "description": props.description,
  "image": props.image,
  "datePublished": props.datePublished,
  "dateModified": props.dateModified || props.datePublished,
  "author": {
    "@type": "Person",
    "name": props.author,
    "url": siteUrl
  },
  "publisher": {
    "@type": "Organization",
    "name": "Rural Time",
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/lovable-uploads/rural-time-logo-new.png`,
      "width": 600,
      "height": 60
    }
  },
  "articleSection": props.section || "Turismo Rural"
});

const getBreadcrumbSchema = (props: BreadcrumbSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": props.items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
  }))
});

const getWebPageSchema = (props: WebPageSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": props.name,
  "description": props.description,
  "url": props.url.startsWith('http') ? props.url : `${siteUrl}${props.url}`,
  "isPartOf": {
    "@type": "WebSite",
    "name": "Rural Time",
    "url": siteUrl
  }
});

export const SchemaMarkup = (props: SchemaProps) => {
  let schema: object;
  
  switch (props.type) {
    case 'organization':
      schema = getOrganizationSchema();
      break;
    case 'localBusiness':
      schema = getLocalBusinessSchema(props);
      break;
    case 'touristAttraction':
      schema = getTouristAttractionSchema(props);
      break;
    case 'article':
      schema = getArticleSchema(props);
      break;
    case 'newsArticle':
      schema = getNewsArticleSchema(props);
      break;
    case 'breadcrumb':
      schema = getBreadcrumbSchema(props);
      break;
    case 'webPage':
      schema = getWebPageSchema(props);
      break;
    default:
      return null;
  }
  
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

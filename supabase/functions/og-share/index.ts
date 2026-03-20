const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = 'https://ruraltime.com.br';
const DEFAULT_IMAGE = `${SITE_URL}/lovable-uploads/rural-time-logo-new.png`;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtml(opts: {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}): string {
  const { title, description, image, url, type = 'website' } = opts;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description.slice(0, 160));
  const safeImage = escapeHtml(image);
  const safeUrl = escapeHtml(url);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}" />

  <meta property="og:type" content="${type}" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:image" content="${safeImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${safeUrl}" />
  <meta property="og:site_name" content="Rural Time" />
  <meta property="og:locale" content="pt_BR" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${safeImage}" />

  <meta http-equiv="refresh" content="0;url=${safeUrl}" />
</head>
<body>
  <p>Redirecionando para <a href="${safeUrl}">${safeTitle}</a>...</p>
</body>
</html>`;
}

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type'); // blog, propriedade, artesanato
    const id = url.searchParams.get('id'); // slug or id
    const path = url.searchParams.get('path'); // full path fallback

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let title = 'Turismo Rural no Brasil | Rural Time';
    let description = 'Descubra as melhores experiências de turismo rural no Brasil.';
    let image = DEFAULT_IMAGE;
    let pageUrl = SITE_URL;
    let ogType = 'website';

    if (type === 'blog' && id) {
      // Try database first
      const { data: dbPost } = await supabase
        .from('blog_posts')
        .select('title, excerpt, cover_image, slug')
        .eq('slug', id)
        .single();

      if (dbPost) {
        title = `${dbPost.title} | Rural Time`;
        description = dbPost.excerpt;
        image = dbPost.cover_image || DEFAULT_IMAGE;
        pageUrl = `${SITE_URL}/blog/${dbPost.slug}`;
        ogType = 'article';
      } else {
        // Fallback: use query params for static blog posts
        const qTitle = url.searchParams.get('title');
        const qDesc = url.searchParams.get('desc');
        const qImg = url.searchParams.get('img');
        if (qTitle) title = `${qTitle} | Rural Time`;
        if (qDesc) description = qDesc;
        if (qImg) image = qImg;
        pageUrl = `${SITE_URL}/blog/${id}`;
        ogType = 'article';
      }
    } else if (type === 'propriedade' && id) {
      const { data: prop } = await supabase
        .from('propriedades')
        .select('nome, descricao, imagens, cidade, estado')
        .eq('id', id)
        .single();

      if (prop) {
        title = `${prop.nome} - Turismo Rural em ${prop.cidade} | Rural Time`;
        description = prop.descricao || `Conheça ${prop.nome} em ${prop.cidade}, ${prop.estado}. Experiência de turismo rural autêntico.`;
        image = prop.imagens?.[0] || DEFAULT_IMAGE;
        pageUrl = `${SITE_URL}/propriedade/${id}`;
      }
    } else if (type === 'artesanato' && id) {
      const { data: art } = await supabase
        .from('artesanatos')
        .select('nome, descricao, imagens, artesao_nome, categoria')
        .eq('id', id)
        .single();

      if (art) {
        title = `${art.nome} - Artesanato Rural | Rural Time`;
        description = art.descricao || `${art.nome} por ${art.artesao_nome}. Artesanato rural autêntico.`;
        image = art.imagens?.[0] || DEFAULT_IMAGE;
        pageUrl = `${SITE_URL}/artesanato/${id}`;
      }
    } else if (path) {
      pageUrl = `${SITE_URL}${path}`;
      const qTitle = url.searchParams.get('title');
      const qDesc = url.searchParams.get('desc');
      const qImg = url.searchParams.get('img');
      if (qTitle) title = qTitle;
      if (qDesc) description = qDesc;
      if (qImg) image = qImg;
    }

    const html = buildHtml({ title, description, image, url: pageUrl, type: ogType });

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('OG Share error:', error);
    const html = buildHtml({
      title: 'Rural Time - Turismo Rural no Brasil',
      description: 'Descubra as melhores experiências de turismo rural no Brasil.',
      image: DEFAULT_IMAGE,
      url: SITE_URL,
    });
    return new Response(html, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
});

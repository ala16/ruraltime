import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/xml; charset=utf-8",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const siteUrl = "https://ruraltime.com.br";
  const now = new Date().toISOString().split("T")[0];

  // Static pages
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/atrativos", priority: "0.9", changefreq: "daily" },
    { url: "/artesanatos", priority: "0.8", changefreq: "weekly" },
    { url: "/propriedades", priority: "0.8", changefreq: "daily" },
    { url: "/blog", priority: "0.9", changefreq: "daily" },
    { url: "/turismo-rural", priority: "0.9", changefreq: "weekly" },
    { url: "/agroturismo", priority: "0.7", changefreq: "monthly" },
    { url: "/turismo-de-fazenda", priority: "0.7", changefreq: "monthly" },
    { url: "/experiencia-no-campo", priority: "0.7", changefreq: "monthly" },
    { url: "/turismo-rural-sustentavel", priority: "0.7", changefreq: "monthly" },
    { url: "/sobre", priority: "0.5", changefreq: "monthly" },
    { url: "/faq", priority: "0.5", changefreq: "monthly" },
    { url: "/roadmap", priority: "0.3", changefreq: "monthly" },
  ];

  // Fetch properties
  const { data: properties } = await supabase
    .from("propriedades")
    .select("id, cidade, estado, updated_at")
    .eq("ativo", true);

  // Fetch blog posts
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("published", true);

  // Fetch artesanatos
  const { data: artesanatos } = await supabase
    .from("artesanatos")
    .select("id, updated_at")
    .eq("disponivel", true);

  // Build unique city/state combos for destination pages
  const citySet = new Set<string>();
  const stateSet = new Set<string>();
  const cityEntries: { estado: string; cidade: string; lastmod: string }[] = [];

  if (properties) {
    for (const prop of properties) {
      const estado = prop.estado?.toLowerCase();
      const cidade = prop.cidade?.toLowerCase().replace(/\s+/g, "-");
      if (estado && cidade) {
        stateSet.add(estado);
        const key = `${estado}/${cidade}`;
        if (!citySet.has(key)) {
          citySet.add(key);
          cityEntries.push({
            estado,
            cidade,
            lastmod: prop.updated_at?.split("T")[0] || now,
          });
        }
      }
    }
  }

  // Build XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Static pages
  for (const page of staticPages) {
    xml += `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // State pages
  for (const estado of stateSet) {
    xml += `  <url>
    <loc>${siteUrl}/turismo-rural/${estado}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  // City destination pages (both /turismo-rural and /destinos routes)
  for (const entry of cityEntries) {
    xml += `  <url>
    <loc>${siteUrl}/turismo-rural/${entry.estado}/${entry.cidade}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/destinos/${entry.estado}/${entry.cidade}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  // Individual property pages
  if (properties) {
    for (const prop of properties) {
      xml += `  <url>
    <loc>${siteUrl}/propriedade/${prop.id}</loc>
    <lastmod>${prop.updated_at?.split("T")[0] || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }
  }

  // Blog posts
  if (blogPosts) {
    for (const post of blogPosts) {
      xml += `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updated_at?.split("T")[0] || now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }
  }

  // Artesanatos
  if (artesanatos) {
    for (const art of artesanatos) {
      xml += `  <url>
    <loc>${siteUrl}/artesanato/${art.id}</loc>
    <lastmod>${art.updated_at?.split("T")[0] || now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }
  }

  xml += `</urlset>`;

  return new Response(xml, { headers: corsHeaders });
});

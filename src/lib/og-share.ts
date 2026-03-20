const SUPABASE_URL = "https://fbljnxjcwcmnzqidgbvc.supabase.co";

type OgShareParams = {
  type: 'blog' | 'propriedade' | 'artesanato' | 'page';
  id?: string;
  path?: string;
  title?: string;
  description?: string;
  image?: string;
};

export function getOgShareUrl(params: OgShareParams): string {
  const base = `${SUPABASE_URL}/functions/v1/og-share`;
  const searchParams = new URLSearchParams();

  if (params.type === 'page') {
    if (params.path) searchParams.set('path', params.path);
  } else {
    searchParams.set('type', params.type);
    if (params.id) searchParams.set('id', params.id);
  }

  if (params.title) searchParams.set('title', params.title);
  if (params.description) searchParams.set('desc', params.description);
  if (params.image) searchParams.set('img', params.image);

  return `${base}?${searchParams.toString()}`;
}

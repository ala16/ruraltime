-- Add WhatsApp and Instagram fields to artesanatos table
ALTER TABLE public.artesanatos 
ADD COLUMN artesao_whatsapp TEXT,
ADD COLUMN artesao_instagram TEXT;
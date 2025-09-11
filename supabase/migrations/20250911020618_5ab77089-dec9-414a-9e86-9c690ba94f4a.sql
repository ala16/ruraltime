-- Add WhatsApp and Instagram fields to properties table
ALTER TABLE public.propriedades 
ADD COLUMN whatsapp text,
ADD COLUMN instagram text;
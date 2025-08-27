-- Create vouchers table for gift experiences
CREATE TABLE public.vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT UNIQUE NOT NULL,
  propriedade_id UUID NOT NULL REFERENCES public.propriedades(id) ON DELETE CASCADE,
  comprador_nome TEXT NOT NULL,
  comprador_email TEXT NOT NULL,
  beneficiario_nome TEXT,
  beneficiario_email TEXT,
  stripe_payment_intent_id TEXT,
  valor DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'usado', 'expirado', 'cancelado')),
  data_compra TIMESTAMPTZ NOT NULL DEFAULT now(),
  data_expiracao TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '1 year',
  data_uso TIMESTAMPTZ,
  usado_por TEXT,
  observacoes TEXT,
  qr_code_data TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;

-- Create policies for vouchers
CREATE POLICY "Admin can manage all vouchers" 
ON public.vouchers 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM admin_profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

CREATE POLICY "Property owners can view their vouchers" 
ON public.vouchers 
FOR SELECT 
USING (
  propriedade_id IN (
    SELECT id FROM public.propriedades 
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view voucher by code" 
ON public.vouchers 
FOR SELECT 
USING (true);

-- Create policy for edge functions to insert vouchers
CREATE POLICY "Edge functions can insert vouchers" 
ON public.vouchers 
FOR INSERT 
WITH CHECK (true);

-- Create policy for edge functions to update vouchers
CREATE POLICY "Edge functions can update vouchers" 
ON public.vouchers 
FOR UPDATE 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_vouchers_updated_at
BEFORE UPDATE ON public.vouchers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate unique voucher code
CREATE OR REPLACE FUNCTION public.generate_voucher_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_code BOOLEAN;
BEGIN
  LOOP
    code := 'RT' || TO_CHAR(NOW(), 'YYYY') || LPAD(FLOOR(RANDOM() * 999999 + 1)::TEXT, 6, '0');
    
    SELECT EXISTS(SELECT 1 FROM public.vouchers WHERE codigo = code) INTO exists_code;
    
    IF NOT exists_code THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Create function to validate voucher
CREATE OR REPLACE FUNCTION public.validate_voucher(voucher_code TEXT)
RETURNS TABLE(
  valid BOOLEAN,
  voucher_id UUID,
  propriedade_nome TEXT,
  beneficiario_nome TEXT,
  valor DECIMAL,
  data_expiracao TIMESTAMPTZ,
  status TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN v.status = 'ativo' AND v.data_expiracao > NOW() THEN true 
      ELSE false 
    END as valid,
    v.id as voucher_id,
    p.nome as propriedade_nome,
    v.beneficiario_nome,
    v.valor,
    v.data_expiracao,
    v.status
  FROM public.vouchers v
  JOIN public.propriedades p ON v.propriedade_id = p.id
  WHERE v.codigo = voucher_code;
END;
$$ LANGUAGE plpgsql;

-- Create function to use voucher
CREATE OR REPLACE FUNCTION public.use_voucher(voucher_code TEXT, used_by_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  voucher_exists BOOLEAN;
  voucher_valid BOOLEAN;
BEGIN
  -- Check if voucher exists and is valid
  SELECT 
    true,
    CASE 
      WHEN status = 'ativo' AND data_expiracao > NOW() THEN true 
      ELSE false 
    END
  INTO voucher_exists, voucher_valid
  FROM public.vouchers 
  WHERE codigo = voucher_code;
  
  IF NOT voucher_exists THEN
    RETURN false;
  END IF;
  
  IF NOT voucher_valid THEN
    RETURN false;
  END IF;
  
  -- Mark voucher as used
  UPDATE public.vouchers 
  SET 
    status = 'usado',
    data_uso = NOW(),
    usado_por = used_by_name,
    updated_at = NOW()
  WHERE codigo = voucher_code;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;
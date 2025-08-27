-- Fix security issues for functions by setting search path
CREATE OR REPLACE FUNCTION public.generate_voucher_code()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.validate_voucher(voucher_code TEXT)
RETURNS TABLE(
  valid BOOLEAN,
  voucher_id UUID,
  propriedade_nome TEXT,
  beneficiario_nome TEXT,
  valor DECIMAL,
  data_expiracao TIMESTAMPTZ,
  status TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.use_voucher(voucher_code TEXT, used_by_name TEXT)
RETURNS BOOLEAN 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;
-- Drop a política existente de delete
DROP POLICY IF EXISTS "Sellers can delete their own products" ON public.products;

-- Criar nova política que permite qualquer usuário autenticado deletar produtos
CREATE POLICY "Anyone can delete products" 
ON public.products 
FOR DELETE 
TO authenticated
USING (true);
import { ShoppingCart, Store, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onCartOpen: () => void;
}

export const Header = ({ onCartOpen }: HeaderProps) => {
  const { getCartCount } = useCart();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Loja Online
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {profile?.role === 'seller' && (
                <Button
                  variant="ghost"
                  onClick={() => navigate('/seller')}
                >
                  Meus Produtos
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={() => navigate('/auth')}
            >
              <User className="h-5 w-5 mr-2" />
              Entrar
            </Button>
          )}
          
          <Button
            variant="outline"
            size="default"
            onClick={onCartOpen}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

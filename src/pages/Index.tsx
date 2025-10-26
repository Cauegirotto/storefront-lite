import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import { Cart } from '@/components/Cart';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import carouselPhone from '@/assets/carousel-phone.jpg';
import carouselLaptop from '@/assets/carousel-laptop.jpg';
import carouselPeripherals from '@/assets/carousel-peripherals.jpg';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    
    // Realtime subscription for new products
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .gt('stock', 0)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.stock > 0 && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartOpen={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full h-full"
        >
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-[500px] w-full">
                <img
                  src={carouselPhone}
                  alt="Smartphones"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/40" />
                <div className="absolute inset-0 container flex flex-col justify-center items-start text-left space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold max-w-3xl">
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      Infinity Tech
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                    Os melhores smartphones do mercado
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[500px] w-full">
                <img
                  src={carouselLaptop}
                  alt="Notebooks"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/40" />
                <div className="absolute inset-0 container flex flex-col justify-center items-start text-left space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold max-w-3xl">
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      Infinity Tech
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                    Notebooks potentes para sua produtividade
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[500px] w-full">
                <img
                  src={carouselPeripherals}
                  alt="Periféricos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/40" />
                <div className="absolute inset-0 container flex flex-col justify-center items-start text-left space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold max-w-3xl">
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      Infinity Tech
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                    Periféricos premium para gamers e profissionais
                  </p>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Busque Seus Produtos</h2>
            <p className="text-muted-foreground">Encontre exatamente o que você precisa</p>
          </div>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </section>

      {/* Products Section */}
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Nossos Produtos</h2>
            <p className="text-muted-foreground">
              {filteredProducts.length === 0
                ? 'Nenhum produto encontrado'
                : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Carregando produtos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                {searchTerm ? `Nenhum produto encontrado com "${searchTerm}"` : 'Nenhum produto disponível'}
              </p>
              {searchTerm && (
                <p className="text-muted-foreground mt-2">
                  Tente buscar por outro termo
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={{
                    ...product,
                    image: product.image_url || '/placeholder.svg'
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container text-center text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Infinity Tech Unimar</p>
          <p>&copy; 2025 Infinity Tech. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import { Cart } from '@/components/Cart';
import { products } from '@/data/products';
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.stock > 0 && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCartOpen={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Banner Infinity Tech"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/40" />
        </div>
        <div className="relative container h-full flex flex-col justify-center items-start text-left space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold max-w-3xl">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Infinity Tech
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            Tecnologia infinita, possibilidades infinitas. Encontre os melhores produtos com os melhores preços.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Conheça Nossa Tecnologia
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Veja como a Infinity Tech está revolucionando o mercado de tecnologia
            </p>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-elegant border border-primary/20">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Vídeo Institucional Infinity Tech"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
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

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                Nenhum produto encontrado com "{searchTerm}"
              </p>
              <p className="text-muted-foreground mt-2">
                Tente buscar por outro termo
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
          <p className="font-semibold text-foreground mb-1">Infinity Tech</p>
          <p>&copy; 2024 Infinity Tech. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

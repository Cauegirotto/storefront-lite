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
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Banner da loja"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
        </div>
        <div className="relative container h-full flex flex-col justify-center items-start text-left space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">
            Encontre os Melhores
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Produtos Aqui
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Tecnologia de ponta com os melhores preços do mercado
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gradient-subtle">
        <div className="container">
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
          <p>&copy; 2024 Loja Online. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

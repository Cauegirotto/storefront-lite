import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const checkoutSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome muito longo'),
  email: z.string().email('E-mail inválido').max(255, 'E-mail muito longo'),
  address: z.string().min(10, 'Endereço deve ter pelo menos 10 caracteres').max(500, 'Endereço muito longo'),
  phone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const total = getCartTotal();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    // Simula o envio da compra
    console.log('Pedido realizado:', { ...data, cart, total });
    setIsSubmitted(true);
    clearCart();
    toast.success('Pedido realizado com sucesso!');
    
    // Redireciona após 3 segundos
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Carrinho Vazio</CardTitle>
            <CardDescription>Adicione produtos ao carrinho para finalizar a compra</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="default"
              className="w-full"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar à Loja
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Pedido Confirmado!</CardTitle>
            <CardDescription className="text-base">
              Obrigado pela sua compra. Em breve entraremos em contato para confirmar o pagamento e entrega.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Você será redirecionado em instantes...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container max-w-6xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar à Loja
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Dados para Entrega</CardTitle>
              <CardDescription>Preencha seus dados para finalizar a compra</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="João Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="joao@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço Completo</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Rua, número, complemento, bairro, cidade - UF"
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" variant="accent" size="lg" className="w-full">
                    Confirmar Pedido
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantidade: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete:</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary text-2xl">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-muted/50">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  Após confirmar o pedido, nossa equipe entrará em contato para finalizar o pagamento e agendar a entrega.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

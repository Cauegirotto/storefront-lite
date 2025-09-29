import { Product } from '@/types/product';
import productHeadphones from '@/assets/product-headphones.jpg';
import productLaptop from '@/assets/product-laptop.jpg';
import productSmartwatch from '@/assets/product-smartwatch.jpg';
import productCamera from '@/assets/product-camera.jpg';
import productTablet from '@/assets/product-tablet.jpg';
import productMouse from '@/assets/product-mouse.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Fone de Ouvido Premium',
    description: 'Fone de ouvido sem fio com cancelamento de ruído ativo e bateria de longa duração',
    price: 599.90,
    image: productHeadphones,
    stock: 15,
    category: 'Áudio'
  },
  {
    id: '2',
    name: 'Notebook Pro 15"',
    description: 'Notebook potente para trabalho e entretenimento com processador de última geração',
    price: 4299.90,
    image: productLaptop,
    stock: 8,
    category: 'Computadores'
  },
  {
    id: '3',
    name: 'Smartwatch Fitness',
    description: 'Relógio inteligente com monitoramento de saúde e múltiplos modos esportivos',
    price: 899.90,
    image: productSmartwatch,
    stock: 20,
    category: 'Wearables'
  },
  {
    id: '4',
    name: 'Câmera Digital Pro',
    description: 'Câmera profissional DSLR com sensor full-frame e vídeo 4K',
    price: 5999.90,
    image: productCamera,
    stock: 5,
    category: 'Fotografia'
  },
  {
    id: '5',
    name: 'Tablet Ultra 10"',
    description: 'Tablet com tela de alta resolução, ideal para trabalho e entretenimento',
    price: 2199.90,
    image: productTablet,
    stock: 12,
    category: 'Tablets'
  },
  {
    id: '6',
    name: 'Mouse Gamer RGB',
    description: 'Mouse gamer de alta precisão com iluminação RGB personalizável',
    price: 299.90,
    image: productMouse,
    stock: 25,
    category: 'Periféricos'
  }
];

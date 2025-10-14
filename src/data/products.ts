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
  },
  {
    id: '7',
    name: 'Teclado Mecânico Pro',
    description: 'Teclado mecânico com switches premium e retroiluminação RGB',
    price: 699.90,
    image: productMouse,
    stock: 18,
    category: 'Periféricos'
  },
  {
    id: '8',
    name: 'Monitor 4K 27"',
    description: 'Monitor Ultra HD com tecnologia IPS e taxa de atualização de 144Hz',
    price: 2499.90,
    image: productLaptop,
    stock: 10,
    category: 'Monitores'
  },
  {
    id: '9',
    name: 'Webcam Full HD',
    description: 'Webcam profissional com microfone integrado e autofoco',
    price: 449.90,
    image: productCamera,
    stock: 22,
    category: 'Periféricos'
  },
  {
    id: '10',
    name: 'SSD 1TB NVMe',
    description: 'Armazenamento de alta velocidade com tecnologia NVMe Gen 4',
    price: 799.90,
    image: productTablet,
    stock: 30,
    category: 'Armazenamento'
  },
  {
    id: '11',
    name: 'Headset Gamer 7.1',
    description: 'Headset surround 7.1 virtual com microfone retrátil',
    price: 399.90,
    image: productHeadphones,
    stock: 16,
    category: 'Áudio'
  },
  {
    id: '12',
    name: 'Cadeira Gamer Ergonômica',
    description: 'Cadeira com ajuste de altura, apoio lombar e braços 4D',
    price: 1299.90,
    image: productSmartwatch,
    stock: 7,
    category: 'Mobiliário'
  }
];

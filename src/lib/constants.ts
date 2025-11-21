// Constantes do Emagrify Store

// Paleta de Cores Emagrify (moderna, suave e profissional)
export const COLORS = {
  primary: {
    main: '#FF6B9D', // Rosa vibrante
    light: '#FFB3D9',
    dark: '#E5527A',
    gradient: 'from-pink-500 via-rose-500 to-purple-500',
  },
  secondary: {
    main: '#8B5CF6', // Roxo moderno
    light: '#C4B5FD',
    dark: '#7C3AED',
  },
  accent: {
    coral: '#FF7F50',
    teal: '#14B8A6',
    gold: '#F59E0B',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

// Configurações do Sistema de Pontos (igual Shein/Shopee)
export const POINTS_CONFIG = {
  POINTS_PER_REAL: 10, // 10 pontos = R$ 1,00
  MIN_POINTS_TO_USE: 100, // Mínimo 100 pontos para usar
  MAX_POINTS_DISCOUNT_PERCENT: 50, // Máximo 50% de desconto com pontos
  DAILY_LOGIN_POINTS: 5,
  PURCHASE_POINTS_MULTIPLIER: 1, // 1 ponto por R$ 1,00 gasto
  REVIEW_POINTS: 20,
  FIRST_PURCHASE_BONUS: 100,
};

// Categorias de Produtos
export const CATEGORIES = [
  { id: 'roupas', name: 'Roupas', icon: 'Shirt' },
  { id: 'acessorios', name: 'Acessórios', icon: 'Watch' },
  { id: 'calcados', name: 'Calçados', icon: 'Footprints' },
  { id: 'beleza', name: 'Beleza', icon: 'Sparkles' },
  { id: 'casa', name: 'Casa & Decoração', icon: 'Home' },
  { id: 'eletronicos', name: 'Eletrônicos', icon: 'Smartphone' },
  { id: 'esportes', name: 'Esportes', icon: 'Dumbbell' },
  { id: 'infantil', name: 'Infantil', icon: 'Baby' },
];

// Produtos Mockados (para demonstração)
export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Vestido Floral Elegante',
    description: 'Vestido longo com estampa floral delicada, perfeito para ocasiões especiais.',
    price: 149.90,
    originalPrice: 299.90,
    discount: 50,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=700&fit=crop',
    ],
    category: 'roupas',
    rating: 4.8,
    reviewCount: 234,
    stock: 45,
    featured: true,
    tags: ['Novo', 'Mais Vendido'],
  },
  {
    id: '2',
    name: 'Bolsa Transversal Premium',
    description: 'Bolsa de couro sintético de alta qualidade com design moderno.',
    price: 89.90,
    originalPrice: 179.90,
    discount: 50,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=700&fit=crop',
    ],
    category: 'acessorios',
    rating: 4.9,
    reviewCount: 567,
    stock: 23,
    featured: true,
    tags: ['Tendência'],
  },
  {
    id: '3',
    name: 'Tênis Esportivo Confort',
    description: 'Tênis ultra confortável para corrida e caminhada, com tecnologia de amortecimento.',
    price: 199.90,
    originalPrice: 349.90,
    discount: 43,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=700&fit=crop',
    ],
    category: 'calcados',
    rating: 4.7,
    reviewCount: 892,
    stock: 67,
    featured: true,
    tags: ['Esporte'],
  },
  {
    id: '4',
    name: 'Kit Skincare Completo',
    description: 'Kit com 5 produtos para cuidados com a pele: limpeza, tônico, sérum, hidratante e protetor.',
    price: 129.90,
    originalPrice: 259.90,
    discount: 50,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=700&fit=crop',
    ],
    category: 'beleza',
    rating: 4.9,
    reviewCount: 1234,
    stock: 89,
    featured: true,
    tags: ['Mais Vendido', 'Promoção'],
  },
  {
    id: '5',
    name: 'Luminária LED Inteligente',
    description: 'Luminária com controle por app, 16 milhões de cores e sincronização com música.',
    price: 79.90,
    originalPrice: 149.90,
    discount: 47,
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&h=700&fit=crop',
    ],
    category: 'casa',
    rating: 4.6,
    reviewCount: 445,
    stock: 156,
    featured: false,
  },
  {
    id: '6',
    name: 'Fone Bluetooth Premium',
    description: 'Fone de ouvido sem fio com cancelamento de ruído ativo e bateria de 30h.',
    price: 249.90,
    originalPrice: 499.90,
    discount: 50,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=700&fit=crop',
    ],
    category: 'eletronicos',
    rating: 4.8,
    reviewCount: 678,
    stock: 34,
    featured: true,
    tags: ['Tecnologia', 'Novo'],
  },
  {
    id: '7',
    name: 'Garrafa Térmica Fitness',
    description: 'Garrafa térmica de 1L, mantém bebidas geladas por 24h e quentes por 12h.',
    price: 49.90,
    originalPrice: 89.90,
    discount: 44,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500&h=700&fit=crop',
    ],
    category: 'esportes',
    rating: 4.7,
    reviewCount: 321,
    stock: 234,
    featured: false,
  },
  {
    id: '8',
    name: 'Mochila Escolar Infantil',
    description: 'Mochila colorida com personagens, resistente à água e ergonômica.',
    price: 69.90,
    originalPrice: 129.90,
    discount: 46,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=700&fit=crop',
      'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=500&h=700&fit=crop',
    ],
    category: 'infantil',
    rating: 4.9,
    reviewCount: 567,
    stock: 123,
    featured: false,
  },
];

// Banners da Home
export const HOME_BANNERS = [
  {
    id: '1',
    title: 'Mega Promoção',
    subtitle: 'Até 70% OFF em produtos selecionados',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop',
    cta: 'Aproveitar',
    link: '/promocoes',
  },
  {
    id: '2',
    title: 'Novidades da Semana',
    subtitle: 'Confira os lançamentos mais esperados',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop',
    cta: 'Ver Novidades',
    link: '/novidades',
  },
  {
    id: '3',
    title: 'Frete Grátis',
    subtitle: 'Em compras acima de R$ 99,90',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c4c?w=1200&h=500&fit=crop',
    cta: 'Comprar Agora',
    link: '/produtos',
  },
];

// Configurações de Frete
export const SHIPPING_CONFIG = {
  FREE_SHIPPING_MIN: 99.90,
  STANDARD_SHIPPING_PRICE: 15.90,
  EXPRESS_SHIPPING_PRICE: 29.90,
  STANDARD_DELIVERY_DAYS: '5-10',
  EXPRESS_DELIVERY_DAYS: '2-4',
};

import {
  Search,
  Palette,
  Code2,
  Megaphone,
  TrendingUp,
  BarChart3,
  PenTool,
  ShoppingCart,
  Zap,
  Target,
  Eye,
  Heart,
  Shield,
  Lightbulb,
  Rocket,
  Users,
  LineChart,
  Smartphone,
  Globe,
  Mail,
  ArrowRight,
  Check,
} from 'lucide-react';

export const companyInfo = {
  name: 'Audaz Vértice Digital',
  positioning:
    'Somos uma empresa especializada em fortalecer a presença digital de empresas através de estratégia, design, tecnologia e marketing.',
  phone: '+55 21 99024-1155',
  phoneHref: 'tel:+5521990241155',
  email: 'Suporte.Audaz@Outlook.com',
  emailHref: 'mailto:Suporte.Audaz@Outlook.com',
  instagram: 'https://www.instagram.com/audaz_vertice',
  instagramLabel: '@audaz_vertice',
  address: 'Rio de Janeiro, Brasil',
  hours: 'Seg — Sex: 09h às 18h',
};

export const navLinks = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Cases', href: '#cases' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contato', href: '#contato' },
];

export const stats = [
  { value: '150+', label: 'Projetos entregues' },
  { value: '98%', label: 'Clientes satisfeitos' },
  { value: '7+', label: 'Anos de mercado' },
  { value: '40M+', label: 'Pessoas impactadas' },
];

export const values = [
  {
    icon: Target,
    title: 'Missão',
    text: 'Transformar marcas em referências digitais através de estratégia, design e tecnologia de alto impacto.',
  },
  {
    icon: Eye,
    title: 'Visão',
    text: 'Ser a agência digital mais audaz e reconhecida do Brasil, referência em resultados e inovação.',
  },
  {
    icon: Heart,
    title: 'Valores',
    text: 'Audácia, excelência, transparência e parceria genuína com cada cliente em cada projeto.',
  },
];

export const diferenciais = [
  {
    icon: Zap,
    title: 'Performance com Propósito',
    text: 'Cada decisão é guiada por dados. Não achismo — estratégia orientada a resultados mensuráveis.',
  },
  {
    icon: Palette,
    title: 'Design que Conquista',
    text: 'Experiências visuais que comunicam, engajam e convertem. Estética a serviço do negócio.',
  },
  {
    icon: Shield,
    title: 'Tecnologia Sólida',
    text: 'Arquitetura robusta, código limpo e performance otimizada. Fundação que sustenta o crescimento.',
  },
  {
    icon: Lightbulb,
    title: 'Estratégia Audaz',
    text: 'Pensamento fora da caixa, criatividade data-driven e posicionamento que diferencia sua marca.',
  },
  {
    icon: Rocket,
    title: 'Crescimento Escalável',
    text: 'Soluções pensadas para escalar junto com sua empresa. Do primeiro clique ao faturamento recorde.',
  },
  {
    icon: Users,
    title: 'Parceria Real',
    text: 'Não somos fornecedores. Somos extensão do seu time, comprometidos com o seu sucesso.',
  },
];

export const services = [
  {
    icon: Search,
    title: 'SEO & Otimização',
    description:
      'Domine o Google com estratégia técnica, conteúdo otimizado e autoridade construída organicamente.',
    image:
      'https://images.pexels.com/photos/942331/pexels-photo-942331.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Auditoria técnica completa', 'Link building de autoridade', 'Content strategy SEO', 'Monitoramento contínuo'],
    slug: 'seo-otimizacao',
  },
  {
    icon: Palette,
    title: 'Design & Branding',
    description:
      'Identidade visual memorável, do conceito ao pixel. Marcas que se destacam em um mercado saturado.',
    image:
      'https://images.pexels.com/photos/6373857/pexels-photo-6373857.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Identidade visual completa', 'Sistema de design', 'Brand guidelines', 'Aplicações digitais'],
    slug: 'design-branding',
  },
  {
    icon: Code2,
    title: 'Desenvolvimento Web',
    description:
      'Sites e plataformas de alta performance. Código limpo, velocidade extrema e experiência impecável.',
    image:
      'https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Sites institucionais', 'E-commerce', 'Web apps customizados', 'Landing pages de conversão'],
    slug: 'desenvolvimento-web',
  },
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    description:
      'Campanhas pagas e orgânicas que geram tráfego qualificado, leads reais e vendas consistentes.',
    image:
      'https://images.pexels.com/photos/15555796/pexels-photo-15555796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Tráfego pago (Meta & Google)', 'Gestão de redes sociais', 'Email marketing', 'Inbound marketing'],
    slug: 'marketing-digital',
  },
  {
    icon: LineChart,
    title: 'Analytics & BI',
    description:
      'Dados transformados em decisões. Dashboards claros, insights acionáveis e visão estratégica completa.',
    image:
      'https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Dashboards personalizados', 'Tracking & TAG Manager', 'Relatórios de performance', 'Análise de funil'],
    slug: 'analytics-bi',
  },
  {
    icon: Smartphone,
    title: 'Experiência Mobile',
    description:
      'Apps e experiências mobile-first que encantam usuários e geram retenção em alto nível.',
    image:
      'https://images.pexels.com/photos/36950598/pexels-photo-36950598.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    features: ['Apps nativos e híbridos', 'UX/UI mobile-first', 'PWA', 'Otimização de conversão'],
    slug: 'experiencia-mobile',
  },
];

export const products = [
  {
    title: 'Site Institucional Premium',
    category: 'Web',
    price: 'A partir de R$ 4.900',
    description: 'Site institucional completo, responsivo, com CMS e SEO otimizado.',
    image:
      'https://images.pexels.com/photos/159299/graphic-design-studio-tracfone-programming-html-159299.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Identidade Visual Completa',
    category: 'Design',
    price: 'A partir de R$ 2.900',
    description: 'Logo, manual de marca, paleta, tipografia e aplicações digitais.',
    image:
      'https://images.pexels.com/photos/5706015/pexels-photo-5706015.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Gestão de Redes Sociais',
    category: 'Marketing',
    price: 'A partir de R$ 1.800/mês',
    description: 'Planejamento, criação e gestão completa das suas redes sociais.',
    image:
      'https://images.pexels.com/photos/15595051/pexels-photo-15595051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'E-commerce Sob Medida',
    category: 'Web',
    price: 'A partir de R$ 8.900',
    description: 'Loja virtual completa, integrada a pagamentos e gestão de estoque.',
    image:
      'https://images.pexels.com/photos/10020092/pexels-photo-10020092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Diagnóstico',
    text: 'Imersão profunda no seu negócio. Analisamos mercado, concorrência, audience e oportunidades.',
  },
  {
    number: '02',
    title: 'Planejamento',
    text: 'Estratégia detalhada com metas claras, KPIs definidos e cronograma de execução preciso.',
  },
  {
    number: '03',
    title: 'Execução',
    text: 'Implementação com excelência técnica e criativa. Cada detalhe pensado para converter.',
  },
  {
    number: '04',
    title: 'Otimização',
    text: 'Monitoramento contínuo, testes A/B e refinamentos baseados em dados reais de performance.',
  },
  {
    number: '05',
    title: 'Escala',
    text: 'Ampliação dos canais que funcionam. Crescimento sustentável e previsível do seu negócio.',
  },
];

export const cases = [
  {
    client: 'TechFlow Solutions',
    description: 'Reposicionamento digital completo resultando em crescimento expressivo de leads.',
    image:
      'https://images.pexels.com/photos/106344/pexels-photo-106344.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    results: [
      { metric: '+320%', label: 'Tráfego orgânico' },
      { metric: '+185%', label: 'Leis qualificadas' },
    ],
    tags: ['SEO', 'Web Design', 'Branding'],
  },
  {
    client: 'Vivenda Café',
    description: 'E-commerce e campanhas de marketing que triplicaram as vendas online.',
    image:
      'https://images.pexels.com/photos/15555796/pexels-photo-15555796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    results: [
      { metric: '3x', label: 'Vendas online' },
      { metric: '-42%', label: 'CAC reduzido' },
    ],
    tags: ['E-commerce', 'Tráfego Pago', 'Social'],
  },
  {
    client: 'Nexus Construtora',
    description: 'Nova identidade visual e site premium que elevaram o posicionamento de marca.',
    image:
      'https://images.pexels.com/photos/921290/pexels-photo-921290.png?auto=compress&cs=tinysrgb&h=650&w=940',
    results: [
      { metric: '+90%', label: 'Reconhecimento' },
      { metric: '2.5x', label: 'Contatos diretos' },
    ],
    tags: ['Branding', 'Web Design', 'UX/UI'],
  },
];

export const testimonials = [
  {
    name: 'Carla Mendonça',
    role: 'CEO',
    company: 'TechFlow Solutions',
    text: 'A Audaz Vértice transformou nossa presença digital. Em seis meses, triplicamos nosso tráfego orgânico e dobramos as leads. Profissionalismo absurdo.',
    photo:
      'https://images.pexels.com/photos/27086922/pexels-photo-27086922.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  },
  {
    name: 'Rodrigo Almeida',
    role: 'Diretor de Marketing',
    company: 'Vivenda Café',
    text: 'O time entendeu nossa essência e traduziu isso em números. As campanhas são precisas, criativas e sempre trazem retorno. Parceria que vale cada centavo.',
    photo:
      'https://images.pexels.com/photos/13111213/pexels-photo-13111213.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  },
  {
    name: 'Juliana Prado',
    role: 'Fundadora',
    company: 'Nexus Construtora',
    text: 'Saímos de uma marca genérica para um posicionamento premium. O site novo é lindo, rápido e converte. A Audaz superou todas as expectativas.',
    photo:
      'https://images.pexels.com/photos/34381971/pexels-photo-34381971.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  },
  {
    name: 'Felipe Castro',
    role: 'Gerente de E-commerce',
    company: 'Moda Urbana',
    text: 'Estratégia de SEO impecável. Passamos da página 5 para o topo do Google em palavras-chave concorridas. Resultado inquestionável.',
    photo:
      'https://images.pexels.com/photos/36645466/pexels-photo-36645466.jpeg?auto=compress&cs=tinysrgb&h=300&w=300',
  },
];

export const faqItems = [
  {
    question: 'Quanto tempo leva para ver resultados?',
    answer:
      'Depende do serviço. Campanhas de tráfego pago geram resultados em dias. SEO orgânico costuma mostrar impacto significativo entre 3 e 6 meses. Semtra, traçamos metas claras desde o início.',
  },
  {
    question: 'Vocês trabalham com empresas de qualquer porte?',
    answer:
      'Sim. Atendemos desde startups em fase inicial até empresas consolidadas. A estratégia é sempre adaptada ao momento e aos objetivos específicos do seu negócio.',
  },
  {
    question: 'Como funciona o processo de contratação?',
    answer:
      'Começamos com uma conversa de diagnóstico, sem custo. Entendemos suas necessidades e apresentamos uma proposta personalizada. Após a aprovação, iniciamos o planejamento detalhado.',
  },
  {
    question: 'Os sites são editáveis após a entrega?',
    answer:
      'Sim. Todos os sites que construímos incluem um painel de gestão de conteúdo (CMS), permitindo que sua equipe atualize textos, imagens e informações sem precisar de conhecimento técnico.',
  },
  {
    question: 'Vocês oferecem suporte contínuo?',
    answer:
      'Sim. Oferecemos planos de manutenção e suporte mensal, incluindo atualizações, monitoramento de performance, backups e melhorias contínuas para garantir resultados sustentáveis.',
  },
  {
    question: 'Qual o investimento médio para começar?',
    answer:
      'Cada projeto é único. Após o diagnóstico inicial, apresentamos uma proposta transparente com escopo, prazo e valor definidos. Trabalhamos com modelos de projeto único ou mensalidades.',
  },
];

export const blogPosts = [
  {
    title: 'SEO em 2026: as 7 tendências que vão dominar o Google',
    excerpt:
      'Inteligência artificial, busca conversacional e E-E-A-T. Veja o que vai definir o sucesso em SEO nos próximos meses.',
    category: 'SEO',
    author: 'Equipe Audaz',
    date: '15 Set 2026',
    readTime: '6 min',
    image:
      'https://images.pexels.com/photos/942331/pexels-photo-942331.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Design System: a base invisível de marcas memoráveis',
    excerpt:
      'Como um sistema de design bem estruturado escaliza sua marca e reduz custos de manutenção em até 60%.',
    category: 'Design',
    author: 'Equipe Audaz',
    date: '08 Set 2026',
    readTime: '8 min',
    image:
      'https://images.pexels.com/photos/6373857/pexels-photo-6373857.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'Tráfego pago: como reduzir seu CAC em 40%',
    excerpt:
      'Estratégias avançadas de segmentação, criativos que convertem e otimização de funil para maximizar ROI.',
    category: 'Marketing',
    author: 'Equipe Audaz',
    date: '01 Set 2026',
    readTime: '5 min',
    image:
      'https://images.pexels.com/photos/15555796/pexels-photo-15555796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const partners = [
  'TechFlow',
  'Vivenda',
  'Nexus',
  'Moda Urbana',
  'Prisma',
  'Orbita',
  'Vertex',
  'Lumen',
];

export const featuredIcons = {
  Search,
  Palette,
  Code2,
  Megaphone,
  TrendingUp,
  BarChart3,
  PenTool,
  ShoppingCart,
  Globe,
  Mail,
  ArrowRight,
  Check,
  Target,
  Eye,
  Heart,
  Shield,
  Lightbulb,
  Rocket,
  Users,
  LineChart,
  Smartphone,
  Zap,
};

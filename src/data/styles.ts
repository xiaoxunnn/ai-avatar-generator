import { StyleOption } from '@/store/useAppStore';

export const styleCategories = [
  { id: 'sci-fi', name: '科幻未来', icon: 'Rocket' },
  { id: 'anime', name: '动漫世界', icon: 'Sparkles' },
  { id: 'art', name: '艺术风格', icon: 'Palette' },
  { id: 'professional', name: '职业形象', icon: 'Briefcase' },
  { id: 'festival', name: '节日主题', icon: 'Gift' },
  { id: 'fantasy', name: '奇幻世界', icon: 'Wand2' },
];

export const styleOptions: StyleOption[] = [
  // 科幻未来
  {
    id: 'cyberpunk',
    name: '赛博朋克',
    icon: 'Zap',
    category: 'sci-fi',
    filter: 'contrast(1.3) saturate(1.4) hue-rotate(-20deg)',
  },
  {
    id: 'space-warrior',
    name: '太空战士',
    icon: 'Shield',
    category: 'sci-fi',
    filter: 'brightness(1.2) contrast(1.4) saturate(1.2)',
  },
  {
    id: 'mecha',
    name: '机械改造',
    icon: 'Cpu',
    category: 'sci-fi',
    filter: 'grayscale(0.3) contrast(1.5) brightness(1.1)',
  },
  {
    id: 'virtual-reality',
    name: '虚拟现实',
    icon: 'Glasses',
    category: 'sci-fi',
    filter: 'hue-rotate(180deg) saturate(1.3) brightness(1.15)',
  },
  {
    id: 'star-citizen',
    name: '星际公民',
    icon: 'Star',
    category: 'sci-fi',
    filter: 'brightness(1.15) contrast(1.2) saturate(1.1)',
  },

  // 动漫世界
  {
    id: 'anime-jp',
    name: '日系动漫',
    icon: 'Heart',
    category: 'anime',
    filter: 'brightness(1.1) saturate(1.3) contrast(1.05)',
  },
  {
    id: 'anime-us',
    name: '美式漫画',
    icon: 'Zap',
    category: 'anime',
    filter: 'contrast(1.2) saturate(1.5) brightness(1.05)',
  },
  {
    id: 'anime-kr',
    name: '韩系偶像',
    icon: 'Star',
    category: 'anime',
    filter: 'brightness(1.15) saturate(1.2) contrast(1.1)',
  },
  {
    id: 'anime-chinese',
    name: '中国古风',
    icon: 'Cloud',
    category: 'anime',
    filter: 'sepia(0.3) saturate(0.9) contrast(1.15)',
  },
  {
    id: 'pixel-art',
    name: '像素游戏',
    icon: 'Grid',
    category: 'anime',
    filter: 'contrast(1.4) saturate(1.2) brightness(1.05)',
  },

  // 艺术风格
  {
    id: 'oil-painting',
    name: '油画肖像',
    icon: 'Paintbrush',
    category: 'art',
    filter: 'sepia(0.4) saturate(1.2) contrast(1.15)',
  },
  {
    id: 'watercolor',
    name: '水彩渲染',
    icon: 'Droplet',
    category: 'art',
    filter: 'blur(0.5px) saturate(0.9) brightness(1.1)',
  },
  {
    id: 'sketch',
    name: '素描线条',
    icon: 'Pencil',
    category: 'art',
    filter: 'grayscale(1) contrast(1.3) brightness(1.05)',
  },
  {
    id: 'ukiyo-e',
    name: '浮世绘风',
    icon: 'Waves',
    category: 'art',
    filter: 'sepia(0.5) saturate(1.1) contrast(1.2)',
  },
  {
    id: 'abstract',
    name: '抽象艺术',
    icon: 'Shapes',
    category: 'art',
    filter: 'hue-rotate(90deg) saturate(1.5) contrast(1.2)',
  },

  // 职业形象
  {
    id: 'business-elite',
    name: '商务精英',
    icon: 'Briefcase',
    category: 'professional',
    filter: 'contrast(1.15) brightness(1.05) saturate(1.1)',
  },
  {
    id: 'casual-fashion',
    name: '休闲时尚',
    icon: 'Shirt',
    category: 'professional',
    filter: 'brightness(1.1) saturate(1.15) contrast(1.05)',
  },
  {
    id: 'sports-active',
    name: '运动活力',
    icon: 'Dumbbell',
    category: 'professional',
    filter: 'contrast(1.2) saturate(1.3) brightness(1.1)',
  },
  {
    id: 'creative',
    name: '创意工作者',
    icon: 'Lightbulb',
    category: 'professional',
    filter: 'brightness(1.15) contrast(1.1) saturate(1.2)',
  },
  {
    id: 'vintage-classic',
    name: '复古经典',
    icon: 'Watch',
    category: 'professional',
    filter: 'sepia(0.35) contrast(1.1) brightness(1.05)',
  },

  // 节日主题
  {
    id: 'chinese-new-year',
    name: '新春喜庆',
    icon: 'Redo2',
    category: 'festival',
    filter: 'sepia(0.2) saturate(1.4) contrast(1.15) hue-rotate(-10deg)',
  },
  {
    id: 'christmas',
    name: '圣诞红金',
    icon: 'Snowflake',
    category: 'festival',
    filter: 'brightness(1.1) contrast(1.2) saturate(1.3)',
  },
  {
    id: 'halloween',
    name: '万圣节',
    icon: 'Ghost',
    category: 'festival',
    filter: 'contrast(1.3) brightness(0.95) saturate(1.2) hue-rotate(-30deg)',
  },
  {
    id: 'birthday',
    name: '生日派对',
    icon: 'Cake',
    category: 'festival',
    filter: 'brightness(1.15) saturate(1.25) contrast(1.1)',
  },
  {
    id: 'valentine',
    name: '浪漫七夕',
    icon: 'Heart',
    category: 'festival',
    filter: 'sepia(0.15) saturate(1.35) contrast(1.1) hue-rotate(-15deg)',
  },

  // 奇幻世界
  {
    id: 'magic-girl',
    name: '魔法少女',
    icon: 'Sparkles',
    category: 'fantasy',
    filter: 'brightness(1.15) saturate(1.3) hue-rotate(30deg)',
  },
  {
    id: 'superhero',
    name: '超级英雄',
    icon: 'Shield',
    category: 'fantasy',
    filter: 'contrast(1.25) brightness(1.1) saturate(1.2)',
  },
  {
    id: 'fairy-tale',
    name: '童话公主',
    icon: 'Crown',
    category: 'fantasy',
    filter: 'brightness(1.12) saturate(1.2) contrast(1.1) hue-rotate(15deg)',
  },
  {
    id: 'dark-knight',
    name: '黑暗骑士',
    icon: 'Moon',
    category: 'fantasy',
    filter: 'contrast(1.3) brightness(0.95) saturate(1.1)',
  },
  {
    id: 'elf',
    name: '精灵仙子',
    icon: 'Leaf',
    category: 'fantasy',
    filter: 'brightness(1.1) saturate(1.15) hue-rotate(60deg) contrast(1.1)',
  },
];

export const getStyleByCategory = (categoryId: string): StyleOption[] => {
  return styleOptions.filter((style) => style.category === categoryId);
};

export const getStyleById = (styleId: string): StyleOption | undefined => {
  return styleOptions.find((style) => style.id === styleId);
};

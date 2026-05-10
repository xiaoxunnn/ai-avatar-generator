# AI头像生成小程序 - 技术架构文档

## 一、技术选型

### 1.1 核心框架

#### 前端框架选择
- **React 18** (via CDN for simplicity)
  - 理由：组件化开发，状态管理清晰，生态丰富
  - 替代方案：Vue 3（更轻量）或原生JS（性能最优）

#### CSS架构
- **CSS3 + CSS Variables**
  - 使用现代CSS特性（Grid、Flexbox、Custom Properties）
  - 避免预处理器依赖，降低学习成本
  - 使用Tailwind式的原子化CSS类名

#### 动画引擎
- **原生CSS动画 + requestAnimationFrame**
  - 优先使用CSS transform和opacity实现动画
  - JavaScript动画仅用于复杂交互
  - 使用Intersection Observer实现滚动触发动画

#### 图标库
- **Lucide Icons** (轻量、现代化)
- 备选：Heroicons 或 Phosphor Icons

### 1.2 第三方库

#### 图像处理
- **Canvas API** (原生)
  - 用于图片裁剪、缩放、滤镜应用
  - 不依赖外部库，保持轻量

#### AI生成模拟
- **本地CSS滤镜 + Canvas处理**
  - 使用CSS filter和Canvas像素操作模拟AI效果
  - 提供多种预设艺术风格滤镜
  - 演示用真实AI API调用架构

#### 构建工具
- **Vite** (开发环境)
  - 快速热更新
  - 优化的生产构建
- 备选：Parcel 或 Webpack

### 1.3 技术栈汇总

| 层级 | 技术选型 | 版本要求 |
|------|---------|---------|
| 核心框架 | React | 18.x |
| 样式方案 | CSS3 + Variables | 现代浏览器 |
| 动画引擎 | 原生CSS + JS | - |
| 图像处理 | Canvas API | - |
| 图标库 | Lucide Icons | 0.300+ |
| 开发构建 | Vite | 5.x |
| 包管理 | npm | 10.x |

---

## 二、系统架构

### 2.1 整体架构图

```
┌─────────────────────────────────────────┐
│            用户界面层 (UI Layer)          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  主页   │ │ 生成页  │ │ 历史页  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│           组件层 (Component Layer)       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │上传器│ │风格卡│ │参数板│ │生成区│  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
├─────────────────────────────────────────┤
│           业务逻辑层 (Service Layer)     │
│  ┌───────────┐ ┌───────────┐           │
│  │ ImageService │ │ StyleService │     │
│  │ (图像处理)  │ │ (风格应用)  │       │
│  └───────────┘ └───────────┘           │
├─────────────────────────────────────────┤
│           数据层 (Data Layer)           │
│  ┌───────────┐ ┌───────────┐           │
│  │ LocalStore │ │ HistoryMgr │        │
│  │ (本地存储) │ │ (历史管理) │         │
│  └───────────┘ └───────────┘           │
├─────────────────────────────────────────┤
│           工具层 (Utility Layer)        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ CanvasUtil │ │ FileUtil │ │FormatUtil││
│  └─────────┘ └─────────┘ └─────────┘  │
└─────────────────────────────────────────┘
```

### 2.2 目录结构

```
/workspace/
├── index.html              # 入口文件
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── src/
│   ├── main.jsx           # React入口
│   ├── App.jsx            # 根组件
│   ├── App.css            # 全局样式
│   ├── components/        # 组件目录
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── UploadZone/
│   │   │   ├── UploadZone.jsx
│   │   │   └── UploadZone.css
│   │   ├── StyleSelector/
│   │   │   ├── StyleSelector.jsx
│   │   │   └── StyleSelector.css
│   │   ├── ParameterPanel/
│   │   │   ├── ParameterPanel.jsx
│   │   │   └── ParameterPanel.css
│   │   ├── Generator/
│   │   │   ├── Generator.jsx
│   │   │   └── Generator.css
│   │   ├── ResultGallery/
│   │   │   ├── ResultGallery.jsx
│   │   │   └── ResultGallery.css
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   ├── services/          # 业务逻辑
│   │   ├── ImageService.js
│   │   └── StyleService.js
│   ├── hooks/             # React Hooks
│   │   ├── useImageProcessor.js
│   │   └── useHistory.js
│   ├── utils/            # 工具函数
│   │   ├── canvas.js
│   │   ├── file.js
│   │   └── format.js
│   └── data/              # 静态数据
│       └── styles.js      # 风格配置
└── public/
    └── favicon.ico
```

---

## 三、核心模块设计

### 3.1 图片上传模块 (UploadZone)

#### 功能职责
- 处理用户图片上传
- 支持拖拽和点击两种方式
- 图片预览和裁剪

#### 核心API
```javascript
// 组件Props
interface UploadZoneProps {
  onUpload: (imageData: ImageData) => void;
  maxSize?: number; // 默认5MB
  accept?: string[]; // 支持格式
}

// 事件处理
- handleDragOver: 处理拖拽悬停
- handleDrop: 处理文件放下
- handleFileSelect: 处理文件选择
- handleImageCrop: 处理图片裁剪
```

#### 状态管理
```javascript
// 组件内部状态
{
  isDragging: boolean;      // 是否正在拖拽
  previewUrl: string | null; // 预览图片URL
  file: File | null;         // 原始文件
  error: string | null;      // 错误信息
}
```

### 3.2 风格选择模块 (StyleSelector)

#### 功能职责
- 展示所有可用风格
- 风格分类切换
- 单选/多选支持
- 风格预览

#### 风格数据结构
```javascript
const styleConfig = {
  id: 'anime',
  name: '动漫风格',
  icon: 'sparkles',
  subStyles: [
    { id: 'anime-jp', name: '日系动漫', filter: 'brightness(1.1) saturate(1.3)' },
    { id: 'anime-us', name: '美式漫画', filter: 'contrast(1.2) saturate(1.5)' },
    { id: 'anime-cyber', name: '赛博朋克', filter: 'hue-rotate(180deg) saturate(1.5)' },
    { id: 'anime-ink', name: '水墨动漫', filter: 'grayscale(0.8) contrast(1.2)' }
  ]
};
```

### 3.3 参数调节模块 (ParameterPanel)

#### 可调参数
1. **风格强度** (0-100)
   - 控制滤镜效果的强弱
   - 映射到CSS filter的各个属性

2. **细节保留** (0-100)
   - 控制原图特征的保留程度
   - 影响混合模式的选择

3. **色彩偏好** (warm/cool/neutral)
   - 暖色调：增加红色/黄色
   - 冷色调：增加蓝色/青色
   - 中性：保持原色

### 3.4 AI生成模块 (Generator)

#### 生成流程
```
用户点击生成
    ↓
显示加载动画
    ↓
Canvas图像处理
    ├─ 应用风格滤镜
    ├─ 调整参数
    ├─ 色彩映射
    └─ 输出结果
    ↓
生成4个变体
    ↓
展示结果画廊
```

#### 模拟AI处理（演示用）
```javascript
// 实际的AI生成流程（生产环境）
async function generateAvatar(imageData, style, params) {
  // 1. 人脸检测
  const faceData = await faceDetection(imageData);
  
  // 2. 风格迁移
  const stylized = await styleTransfer(imageData, style.id);
  
  // 3. 参数调整
  const adjusted = applyParameters(stylized, params);
  
  // 4. 输出优化
  const final = optimizeOutput(adjusted);
  
  return final;
}

// 当前演示用简化版本
function generateAvatar(imageData, style, params) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 应用滤镜
    ctx.filter = generateFilter(style, params);
    ctx.drawImage(imageData, 0, 0);
    
    resolve(canvas.toDataURL('image/png'));
  });
}
```

### 3.5 结果展示模块 (ResultGallery)

#### 功能
- 大图预览（点击放大）
- 下载功能（多分辨率）
- 分享功能
- 收藏到历史

#### 交互设计
- 网格布局展示4张生成结果
- 点击任意一张全屏预览
- 支持左右滑动查看
- 长按保存/分享

---

## 四、图像处理技术

### 4.1 Canvas处理流程

```
原始图片 (File/Blob)
    ↓
加载到Image对象
    ↓
绘制到Canvas
    ↓
应用变换矩阵
├─ 缩放 (scale)
├─ 旋转 (rotate)
└─ 平移 (translate)
    ↓
应用滤镜效果
├─ CSS Filter
├─ 颜色矩阵
└─ 混合模式
    ↓
导出为DataURL/Blob
    ↓
可选：压缩和质量调整
```

### 4.2 风格滤镜实现

#### 基础滤镜库
```javascript
const filterPresets = {
  // 动漫风格
  'anime-jp': 'brightness(1.1) saturate(1.3) contrast(1.05)',
  'anime-us': 'contrast(1.2) saturate(1.5) brightness(1.05)',
  'anime-cyber': 'hue-rotate(180deg) saturate(1.5) brightness(1.1)',
  'anime-ink': 'grayscale(0.8) contrast(1.2) brightness(0.95)',
  
  // 艺术风格
  'art-oil': 'sepia(0.4) saturate(1.2) contrast(1.15)',
  'art-watercolor': 'blur(0.5px) saturate(0.9) brightness(1.1)',
  'art-sketch': 'grayscale(1) contrast(1.3) brightness(1.05)',
  'art-chinese': 'contrast(1.1) saturate(0.7) brightness(0.95)',
  
  // 科技风格
  'tech-3d': 'contrast(1.3) brightness(1.15) saturate(1.1)',
  'tech-cyber': 'hue-rotate(200deg) saturate(1.4) brightness(1.1)',
  'tech-robot': 'contrast(1.4) saturate(0.8) brightness(1.1)',
  'tech-hologram': 'hue-rotate(60deg) saturate(1.2) brightness(1.2)',
  
  // 更多风格...
};
```

#### 参数到滤镜的映射
```javascript
function buildFilter(styleId, intensity, preservation, colorMode) {
  const baseFilter = filterPresets[styleId] || 'none';
  const intensityFactor = intensity / 100;
  
  let colorAdjustment = '';
  if (colorMode === 'warm') {
    colorAdjustment = 'sepia(0.1) saturate(1.1)';
  } else if (colorMode === 'cool') {
    colorAdjustment = 'hue-rotate(15deg) saturate(0.95)';
  }
  
  // 混合原图和滤镜
  const mixFilter = intensityFactor < 1 
    ? `url(#blend-${styleId})` 
    : baseFilter;
  
  return `${baseFilter} ${colorAdjustment}`;
}
```

### 4.3 输出优化

#### 分辨率处理
```javascript
function optimizeOutput(canvas, options = {}) {
  const {
    maxWidth = 1024,
    maxHeight = 1024,
    quality = 0.92,
    format = 'png'
  } = options;
  
  // 等比缩放
  let { width, height } = canvas;
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width *= ratio;
    height *= ratio;
  }
  
  // 创建输出Canvas
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;
  
  const ctx = outputCanvas.getContext('2d');
  ctx.drawImage(canvas, 0, 0, width, height);
  
  return {
    dataUrl: outputCanvas.toDataURL(`image/${format}`, quality),
    blob: await new Promise(resolve => 
      outputCanvas.toBlob(resolve, `image/${format}`, quality)
    ),
    dimensions: { width, height }
  };
}
```

---

## 五、状态管理

### 5.1 React Context架构

```javascript
// AppContext - 全局状态
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    // 上传状态
    uploadedImage: null,
    croppedImage: null,
    
    // 选择状态
    selectedStyle: null,
    selectedSubStyle: null,
    parameters: {
      intensity: 75,
      preservation: 50,
      colorMode: 'neutral'
    },
    
    // 生成状态
    isGenerating: false,
    generatedImages: [],
    selectedResult: null,
    
    // 历史记录
    history: [],
    
    // UI状态
    currentPage: 'home', // home | generate | result | history
    isLoading: false,
    error: null
  });
  
  // Actions
  const actions = {
    uploadImage: (imageData) => { /* ... */ },
    selectStyle: (styleId, subStyleId) => { /* ... */ },
    updateParameters: (params) => { /* ... */ },
    generate: async () => { /* ... */ },
    selectResult: (result) => { /* ... */ },
    downloadResult: async (result) => { /* ... */ },
    addToHistory: (result) => { /* ... */ },
    // ...
  };
  
  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};
```

### 5.2 自定义Hooks

#### useImageProcessor
```javascript
const useImageProcessor = () => {
  const processImage = async (file, options = {}) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = processCanvas(img, options);
        resolve({
          dataUrl: canvas.toDataURL(),
          blob: canvas.toBlob(),
          width: canvas.width,
          height: canvas.height
        });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };
  
  const applyStyle = (imageData, styleId, params) => {
    // 应用风格滤镜
  };
  
  return { processImage, applyStyle };
};
```

#### useHistory
```javascript
const useHistory = () => {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('avatarHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);
  
  const addToHistory = (item) => {
    const newHistory = [item, ...history].slice(0, 50);
    setHistory(newHistory);
    localStorage.setItem('avatarHistory', JSON.stringify(newHistory));
  };
  
  const removeFromHistory = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('avatarHistory', JSON.stringify(newHistory));
  };
  
  return { history, addToHistory, removeFromHistory };
};
```

---

## 六、响应式设计

### 6.1 断点策略

```css
/* 移动端优先 */
:root {
  /* 默认: 手机 (< 640px) */
  --container-padding: 16px;
  --card-radius: 12px;
  --font-size-base: 14px;
}

/* 平板 (640px - 1024px) */
@media (min-width: 640px) {
  :root {
    --container-padding: 24px;
    --card-radius: 16px;
    --font-size-base: 16px;
  }
}

/* 桌面 (1024px+) */
@media (min-width: 1024px) {
  :root {
    --container-padding: 32px;
    --card-radius: 20px;
    --font-size-base: 16px;
  }
}
```

### 6.2 布局适配

```css
/* 手机: 单列布局 */
.generator-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 平板+: 双列布局 */
@media (min-width: 768px) {
  .generator-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  
  .upload-section {
    order: 1;
  }
  
  .control-section {
    order: 2;
  }
}

/* 桌面: 三列布局 */
@media (min-width: 1024px) {
  .generator-container {
    grid-template-columns: 300px 1fr 300px;
  }
}
```

---

## 七、性能优化

### 7.1 图片优化

- 使用WebP格式（支持时）
- 懒加载非关键图片
- Canvas离屏渲染
- 缓存处理结果

### 7.2 渲染优化

- React.memo减少不必要渲染
- useMemo缓存计算结果
- useCallback缓存回调函数
- 虚拟列表长列表（历史记录）

### 7.3 动画优化

- 优先使用transform和opacity
- will-change提示浏览器优化
- requestAnimationFrame节流
- 减少重绘和重排

### 7.4 加载优化

- 代码分割（路由级别）
- Tree shaking移除死代码
- 预加载关键资源
- Service Worker缓存（可选）

---

## 八、可访问性 (Accessibility)

### 8.1 ARIA支持

```jsx
<button
  aria-label="上传图片"
  aria-describedby="upload-hint"
  aria-pressed={isActive}
  role="button"
>
  <UploadIcon />
</button>
```

### 8.2 键盘导航

- 所有交互元素可Tab聚焦
- 方向键切换风格选项
- Enter/Space确认选择
- Escape关闭弹窗

### 8.3 视觉辅助

- 足够的颜色对比度（WCAG AA）
- focus状态明显可见
- 错误信息文本描述
- 支持减弱动画偏好

---

## 九、部署架构

### 9.1 开发环境
```
本地开发服务器 (Vite Dev Server)
├── localhost:3000
├── HMR热更新
└── Source Maps
```

### 9.2 生产环境
```
静态资源部署
├── CDN加速
├── 缓存策略
│   ├── HTML: no-cache
│   ├── CSS/JS: max-age=1year
│   └── 图片: max-age=1month
└── Gzip/Brotli压缩
```

### 9.3 文件结构（生产构建）
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── images/
│       └── [hash].[ext]
└── manifest.json
```

---

## 十、测试策略

### 10.1 单元测试
- Jest + React Testing Library
- 组件渲染测试
- 工具函数测试

### 10.2 集成测试
- 用户流程测试
- 状态管理测试

### 10.3 E2E测试
- Playwright/Cypress
- 完整用户旅程
- 跨浏览器测试

### 10.4 性能测试
- Lighthouse CI
- 关键指标监控
- Bundle大小追踪

---

*文档版本：v1.0*  
*最后更新：2026-05-10*  
*架构师：AI Assistant*

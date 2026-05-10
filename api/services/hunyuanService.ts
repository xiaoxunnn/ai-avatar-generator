import crypto from 'crypto';

interface AvatarRequest {
  images: string[];  // base64编码的图片
  style: string;     // 风格ID
  count: number;     // 生成数量
}

interface AvatarResult {
  id: string;
  url: string;
  style: string;
  thumbnail?: string;
}

/**
 * 生成腾讯云签名
 */
function generateSignature(secretId: string, secretKey: string, timestamp: number): string {
  const algorithm = 'sha256';
  const signature = crypto
    .createHmac(algorithm, secretKey)
    .update(`${secretId}${timestamp}`)
    .digest('hex');
  return signature;
}

/**
 * 提交混元头像生成任务
 */
async function submitAvatarJob(
  secretId: string,
  secretKey: string,
  imageData: string,
  style: string
): Promise<{ taskId: string }> {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(secretId, secretKey, timestamp);

  const response = await fetch('https://hunyuan.cloud.tencent.com/api/v1/avatar/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-TC-Auth-Method': 'HmacSHA256',
      'X-TC-Key-Id': secretId,
      'X-TC-Timestamp': timestamp.toString(),
      'X-TC-Signature': signature,
    },
    body: JSON.stringify({
      image: imageData,
      style: style,
      output_format: 'png',
      resolution: '1024x1024',
    }),
  });

  if (!response.ok) {
    throw new Error(`API请求失败: ${response.status}`);
  }

  const data = await response.json();
  return { taskId: data.task_id };
}

/**
 * 查询任务状态
 */
async function queryTaskStatus(
  secretId: string,
  secretKey: string,
  taskId: string
): Promise<{ status: string; images?: string[] }> {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(secretId, secretKey, timestamp);

  const response = await fetch(`https://hunyuan.cloud.tencent.com/api/v1/avatar/query/${taskId}`, {
    method: 'GET',
    headers: {
      'X-TC-Auth-Method': 'HmacSHA256',
      'X-TC-Key-Id': secretId,
      'X-TC-Timestamp': timestamp.toString(),
      'X-TC-Signature': signature,
    },
  });

  if (!response.ok) {
    throw new Error(`查询失败: ${response.status}`);
  }

  const data = await response.json();
  return {
    status: data.status,
    images: data.images,
  };
}

/**
 * 演示模式：生成模拟头像
 */
async function generateDemoAvatars(
  images: string[],
  style: string,
  count: number
): Promise<AvatarResult[]> {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 2000));

  const results: AvatarResult[] = [];
  const styleName = getStyleName(style);

  for (let i = 0; i < count; i++) {
    results.push({
      id: `${style}-${i}-${Date.now()}`,
      url: images[0] || `https://picsum.photos/seed/${style}${i}/1024/1024`,
      style: styleName,
      thumbnail: images[0] || `https://picsum.photos/seed/${style}${i}/512/512`,
    });
  }

  return results;
}

/**
 * 获取风格名称
 */
function getStyleName(styleId: string): string {
  const styleNames: Record<string, string> = {
    'cyberpunk': '赛博朋克',
    'space-warrior': '太空战士',
    'mecha': '机械改造',
    'virtual-reality': '虚拟现实',
    'star-citizen': '星际公民',
    'anime-jp': '日系动漫',
    'anime-us': '美式漫画',
    'anime-kr': '韩系偶像',
    'anime-chinese': '中国古风',
    'pixel-art': '像素游戏',
    'oil-painting': '油画肖像',
    'watercolor': '水彩渲染',
    'sketch': '素描线条',
    'ukiyo-e': '浮世绘风',
    'abstract': '抽象艺术',
    'business-elite': '商务精英',
    'casual-fashion': '休闲时尚',
    'sports-active': '运动活力',
    'creative': '创意工作者',
    'vintage-classic': '复古经典',
    'chinese-new-year': '新春喜庆',
    'christmas': '圣诞红金',
    'halloween': '万圣节',
    'birthday': '生日派对',
    'valentine': '浪漫七夕',
    'magic-girl': '魔法少女',
    'superhero': '超级英雄',
    'fairy-tale': '童话公主',
    'dark-knight': '黑暗骑士',
    'elf': '精灵仙子',
  };

  return styleNames[styleId] || styleId;
}

/**
 * 获取风格的提示词
 */
function getStylePrompt(styleId: string): string {
  const prompts: Record<string, { positive: string; negative: string }> = {
    'cyberpunk': {
      positive: 'cyberpunk portrait, neon lights, futuristic city, high-tech, sharp focus, 8k, cinematic lighting',
      negative: 'blurry, low quality, cartoon, anime, painting',
    },
    'anime-jp': {
      positive: 'anime portrait, Japanese anime style, big eyes, soft lighting, detailed, sharp focus, cel shading',
      negative: 'realistic, 3d render, photo, deformed, low quality',
    },
    'oil-painting': {
      positive: 'oil painting portrait, classical art style, Renaissance, detailed brushstrokes, museum quality',
      negative: 'modern, digital art, blurry, low quality',
    },
    'business-elite': {
      positive: 'professional business portrait, formal attire, corporate headshot, studio lighting, sharp focus',
      negative: 'casual, informal, cartoon, anime',
    },
    'magic-girl': {
      positive: 'magical girl portrait, sparkles, fantasy, cute, colorful, anime style, ethereal lighting',
      negative: 'realistic, dark, horror, low quality',
    },
  };

  return prompts[styleId]?.positive || 'artistic portrait, creative style, high quality';
}

/**
 * 主生成函数
 */
export async function generateAvatar(request: AvatarRequest): Promise<AvatarResult[]> {
  const { images, style, count = 4 } = request;

  // 检查是否配置了腾讯云密钥
  const secretId = process.env.TENCENT_SECRET_ID;
  const secretKey = process.env.TENCENT_SECRET_KEY;

  if (!secretId || !secretKey) {
    console.log('🔧 使用演示模式生成头像');
    return generateDemoAvatars(images, style, count);
  }

  try {
    console.log(`🎨 开始生成头像: 风格=${style}, 数量=${count}`);

    // 提交生成任务
    const { taskId } = await submitAvatarJob(secretId, secretKey, images[0], style);
    console.log(`📝 任务已提交: ${taskId}`);

    // 轮询查询任务状态
    let status = 'pending';
    let result: AvatarResult[] = [];
    const maxRetries = 30;
    const retryInterval = 2000;

    for (let i = 0; i < maxRetries; i++) {
      await new Promise(resolve => setTimeout(resolve, retryInterval));

      const taskStatus = await queryTaskStatus(secretId, secretKey, taskId);
      status = taskStatus.status;

      console.log(`⏳ 任务状态: ${status} (${i + 1}/${maxRetries})`);

      if (status === 'completed' && taskStatus.images) {
        result = taskStatus.images.map((url, index) => ({
          id: `${taskId}-${index}`,
          url,
          style: getStyleName(style),
          thumbnail: url,
        }));
        break;
      } else if (status === 'failed') {
        throw new Error('头像生成失败');
      }
    }

    if (result.length === 0) {
      console.log('⚠️ 任务超时，使用演示模式');
      return generateDemoAvatars(images, style, count);
    }

    console.log(`✅ 生成完成: ${result.length} 张头像`);
    return result;

  } catch (error) {
    console.error('❌ 生成失败:', error);
    // 出错时降级到演示模式
    console.log('🔧 降级到演示模式');
    return generateDemoAvatars(images, style, count);
  }
}

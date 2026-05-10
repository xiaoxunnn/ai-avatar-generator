import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateAvatar } from './services/hunyuanService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Generate avatar endpoint
app.post('/api/generate-avatar', async (req, res) => {
  try {
    const { images, style, count = 4 } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ error: '请提供至少一张图片' });
    }

    if (!style) {
      return res.status(400).json({ error: '请选择风格' });
    }

    console.log(`收到头像生成请求: 风格=${style}, 数量=${count}, 图片数=${images.length}`);

    // 调用腾讯混元API生成头像
    const result = await generateAvatar({
      images,
      style,
      count
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('生成头像失败:', error);
    res.status(500).json({
      success: false,
      error: error.message || '生成失败，请稍后重试'
    });
  }
});

// 查询任务状态
app.get('/api/task/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    // 演示模式直接返回成功
    res.json({
      success: true,
      data: {
        taskId,
        status: 'completed',
        progress: 100
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 后端服务已启动: http://localhost:${PORT}`);
  console.log(`📡 API端点: http://localhost:${PORT}/api`);
  console.log(`🔑 腾讯云SecretId: ${process.env.TENCENT_SECRET_ID ? '已配置' : '未配置（使用演示模式）'}`);
});

export default app;

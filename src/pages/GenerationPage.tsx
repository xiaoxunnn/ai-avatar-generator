import { useEffect, useState } from 'react';
import { Sparkles, Clock, AlertCircle } from 'lucide-react';
import { useAppStore, GeneratedAvatar } from '@/store/useAppStore';
import { styleOptions } from '@/data/styles';
import { generateAvatarAPI } from '@/services/api';

export default function GenerationPage() {
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(120);
  const [error, setError] = useState<string | null>(null);
  const { selectedStyles, uploadedImages, setGeneratedAvatars, setCurrentPage } = useAppStore();

  useEffect(() => {
    const generateAvatars = async () => {
      try {
        const allAvatars: GeneratedAvatar[] = [];
        
        // 为每个选中的风格生成头像
        for (let i = 0; i < selectedStyles.length; i++) {
          const style = selectedStyles[i];
          const styleInfo = styleOptions.find(s => s.id === style);
          
          // 更新进度
          setProgress((i / selectedStyles.length) * 80);
          
          // 调用API生成该风格的头像
          const response = await generateAvatarAPI({
            images: uploadedImages.map(img => img.url),
            style: style,
            count: 10,
          });

          if (response.success && response.data) {
            const styleAvatars = response.data.map((avatar, idx) => ({
              id: `${style}-${idx}-${Date.now()}`,
              url: avatar.url,
              style: avatar.style || styleInfo?.name || style,
              thumbnail: avatar.thumbnail || avatar.url,
            }));
            allAvatars.push(...styleAvatars);
          }
        }

        // 完成进度
        setProgress(100);
        
        // 延迟一下显示结果
        setTimeout(() => {
          setGeneratedAvatars(allAvatars);
          setCurrentPage('results');
        }, 1000);

      } catch (err) {
        console.error('生成失败:', err);
        setError(err instanceof Error ? err.message : '生成失败');
      }
    };

    // 启动生成
    generateAvatars();

  }, [selectedStyles, uploadedImages, setGeneratedAvatars, setCurrentPage]);

  // 模拟进度更新（因为实际进度由API返回）
  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCancel = () => {
    if (confirm('确定要取消生成吗？')) {
      setCurrentPage('home');
      useAppStore.getState().reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Main Content */}
        <div className="text-center">
          {/* Animated Icon */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-20"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-40"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="text-white w-16 h-16 animate-bounce" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            ✨ AI正在创作 ✨
          </h1>
          
          {/* Description */}
          <p className="text-white/80 mb-8">
            正在使用腾讯混元大模型为您生成 {selectedStyles.length * 10} 张专属头像
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-left">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Progress Bar */}
          {!error && (
            <div className="mb-6">
              <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              
              {/* Percentage */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-4xl font-bold text-white">{Math.round(progress)}</span>
                <span className="text-2xl text-white/60">%</span>
              </div>
            </div>
          )}

          {/* Status Messages */}
          <div className="flex items-center justify-center gap-2 text-white/70 mb-8">
            <Clock size={18} />
            <span>
              {progress < 30 && '📤 正在上传图片...'}
              {progress >= 30 && progress < 80 && '🎨 AI正在创作中...'}
              {progress >= 80 && progress < 100 && '⚙️ 正在处理结果...'}
              {progress >= 100 && '✅ 生成完成！'}
            </span>
          </div>

          {/* Tips Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left mb-8">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              💡 温馨提示
            </h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>使用腾讯混元大模型生成高质量头像</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>支持30+种艺术风格</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>您的照片仅用于本次生成，不会保存</span>
              </li>
            </ul>
          </div>

          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="text-white/60 hover:text-white transition-colors text-sm"
          >
            取消生成
          </button>
        </div>

        {/* Status Cards */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {selectedStyles.length}
            </div>
            <div className="text-xs text-white/60">选中风格</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {uploadedImages.length}
            </div>
            <div className="text-xs text-white/60">上传照片</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {selectedStyles.length * 10}
            </div>
            <div className="text-xs text-white/60">目标头像</div>
          </div>
        </div>

        {/* Tech Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/60 text-sm">
            <span>🔗</span>
            <span>由 腾讯混元大模型 驱动</span>
          </div>
        </div>
      </div>
    </div>
  );
}

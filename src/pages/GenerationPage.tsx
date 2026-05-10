import { useEffect, useState } from 'react';
import { Sparkles, Clock, AlertCircle } from 'lucide-react';
import { useAppStore, GeneratedAvatar } from '@/store/useAppStore';
import { styleOptions } from '@/data/styles';

export default function GenerationPage() {
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(120);
  const { selectedStyles, uploadedImages, setGeneratedAvatars, setCurrentPage } = useAppStore();

  useEffect(() => {
    const totalAvatars = selectedStyles.length * 10;
    const duration = Math.max(3, Math.min(estimatedTime, 120));
    const interval = duration * 10; // Update every 10th of duration
    const increment = 100 / (interval / 100);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        
        // Decrease estimated time
        setEstimatedTime((prevTime) => Math.max(0, prevTime - 0.1));
        
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Generate fake avatars
      const avatars: GeneratedAvatar[] = [];
      selectedStyles.forEach((styleId) => {
        const style = styleOptions.find((s) => s.id === styleId);
        for (let i = 0; i < 10; i++) {
          avatars.push({
            id: `${styleId}-${i}-${Date.now()}`,
            url: uploadedImages[0]?.url || 'https://picsum.photos/400',
            style: style?.name || styleId,
            thumbnail: uploadedImages[0]?.url || 'https://picsum.photos/200',
          });
        }
      });
      
      setGeneratedAvatars(avatars);
      setTimeout(() => {
        setCurrentPage('results');
      }, 1000);
    }
  }, [progress, selectedStyles, uploadedImages, setGeneratedAvatars, setCurrentPage]);

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
            ✨ 魔法进行中 ✨
          </h1>
          
          {/* Description */}
          <p className="text-white/80 mb-8">
            正在为您创作 {selectedStyles.length * 10} 张专属头像
          </p>

          {/* Progress Bar */}
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

          {/* Estimated Time */}
          <div className="flex items-center justify-center gap-2 text-white/70 mb-8">
            <Clock size={18} />
            <span>预计还需: {Math.ceil(estimatedTime)} 秒</span>
          </div>

          {/* Tips Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left mb-8">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              💡 提示
            </h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>生成完成后我们会通知您</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>您可以先去做其他事情</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>所有照片处理后会自动从服务器删除</span>
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
      </div>
    </div>
  );
}

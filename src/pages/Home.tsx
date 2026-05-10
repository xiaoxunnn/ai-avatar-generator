import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const { setCurrentPage } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            ✨ 魔法头像
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">
            发现不一样的自己
          </p>
          <p className="text-base text-white/70">
            上传照片，AI为你创作无限可能
          </p>
        </header>

        {/* Main Action Cards */}
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Magic Avatar Card */}
          <div 
            onClick={() => setCurrentPage('upload')}
            className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg animate-float">
                  🎯
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">创建魔法头像</h2>
                  <p className="text-white/80 text-sm">上传10-20张照片，生成50-200张AI头像</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs animate-pulse">🛸 科幻</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs animate-pulse" style={{animationDelay: '0.1s'}}>🎨 动漫</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs animate-pulse" style={{animationDelay: '0.2s'}}>🖼️ 艺术</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs animate-pulse" style={{animationDelay: '0.3s'}}>✨ 更多</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-white/60 text-sm">
                <span>点击开始 →</span>
              </div>
            </div>
          </div>

          {/* Photo Editor Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer opacity-50">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  📷
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">照片编辑器</h2>
                  <p className="text-white/80 text-sm">快速美化单张照片，一键增强</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">美颜</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">滤镜</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">背景</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">调整</span>
              </div>
              <div className="mt-4">
                <span className="text-white/40 text-sm">即将推出 🚀</span>
              </div>
            </div>
          </div>

          {/* Video Maker Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer opacity-50">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  🎬
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">视频制作</h2>
                  <p className="text-white/80 text-sm">把照片变成视频，AI自动剪辑</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">音乐</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">转场</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">字幕</span>
              </div>
              <div className="mt-4">
                <span className="text-white/40 text-sm">即将推出 🚀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-white mb-1 animate-bounce-in">200+</div>
              <div className="text-sm text-white/70">风格选择</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-white mb-1 animate-bounce-in" style={{animationDelay: '0.1s'}}>10秒</div>
              <div className="text-sm text-white/70">快速生成</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-3xl font-bold text-white mb-1 animate-bounce-in" style={{animationDelay: '0.2s'}}>100%</div>
              <div className="text-sm text-white/70">隐私保护</div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-white font-semibold mb-2">隐私保护</h3>
            <p className="text-white/60 text-sm">
              您的照片仅用于头像生成，处理后自动从服务器删除
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-white/50 text-sm">
          <p>© 2024 魔法头像 - AI头像艺术生成器</p>
          <p className="mt-2">基于 Stable Diffusion 技术驱动</p>
        </footer>
      </div>
    </div>
  );
}

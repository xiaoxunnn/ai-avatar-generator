import { useState } from 'react';
import { Check, Download, Share2, Heart, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore, GeneratedAvatar } from '@/store/useAppStore';

export default function ResultsPage() {
  const [selectedAvatars, setSelectedAvatars] = useState<string[]>([]);
  const [previewAvatar, setPreviewAvatar] = useState<GeneratedAvatar | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { generatedAvatars, setCurrentPage, reset } = useAppStore();

  const toggleSelect = (id: string) => {
    setSelectedAvatars((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleDownload = (avatar: GeneratedAvatar) => {
    const link = document.createElement('a');
    link.href = avatar.url;
    link.download = `avatar-${avatar.style}-${Date.now()}.jpg`;
    link.click();
  };

  const handleShare = async (avatar: GeneratedAvatar) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的AI头像',
          text: `使用AI生成的${avatar.style}风格头像，太酷了！`,
          url: avatar.url,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(avatar.url);
      alert('链接已复制到剪贴板');
    }
  };

  const handleBackToHome = () => {
    reset();
    setCurrentPage('home');
  };

  // Group avatars by style
  const groupedAvatars = generatedAvatars.reduce((acc, avatar) => {
    if (!acc[avatar.style]) {
      acc[avatar.style] = [];
    }
    acc[avatar.style].push(avatar);
    return acc;
  }, {} as Record<string, GeneratedAvatar[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToHome}
            className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            <Home size={20} />
            <span>返回首页</span>
          </button>
          <h1 className="text-xl font-bold text-white">🎉 生成完成！</h1>
          <div className="w-24"></div>
        </header>

        {/* Success Message */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              恭喜！生成了 {generatedAvatars.length} 张头像
            </h2>
            <p className="text-white/70 text-sm">
              点击头像选择，点击右下角按钮保存或分享
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedAvatars(generatedAvatars.map((a) => a.id))}
              className="flex-1 py-3 rounded-xl font-medium text-white bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Check size={18} />
              <span>全选</span>
            </button>
            <button
              onClick={() => {
                selectedAvatars.forEach((id) => {
                  const avatar = generatedAvatars.find((a) => a.id === id);
                  if (avatar) handleDownload(avatar);
                });
              }}
              disabled={selectedAvatars.length === 0}
              className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                selectedAvatars.length > 0
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:shadow-lg'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              <Download size={18} />
              <span>下载 ({selectedAvatars.length})</span>
            </button>
          </div>
        </div>

        {/* Selected Count */}
        {selectedAvatars.length > 0 && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 flex items-center justify-between">
              <span className="text-yellow-200">
                已选择 <span className="font-bold">{selectedAvatars.length}</span> 张头像
              </span>
              <button
                onClick={() => setSelectedAvatars([])}
                className="text-yellow-200/70 hover:text-yellow-200 text-sm"
              >
                取消选择
              </button>
            </div>
          </div>
        )}

        {/* Avatar Gallery by Style */}
        <div className="max-w-2xl mx-auto space-y-8">
          {Object.entries(groupedAvatars).map(([style, avatars]) => (
            <div key={style}>
              {/* Style Header */}
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm">
                  🎨
                </span>
                <span>{style}</span>
                <span className="text-white/50 text-sm">({avatars.length}张)</span>
              </h3>

              {/* Avatar Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {avatars.map((avatar) => {
                  const isSelected = selectedAvatars.includes(avatar.id);
                  const isFavorite = favorites.includes(avatar.id);

                  return (
                    <div
                      key={avatar.id}
                      className={`
                        relative group cursor-pointer transition-all duration-300
                        ${isSelected ? 'scale-105 ring-4 ring-yellow-400' : 'hover:scale-105'}
                      `}
                      onClick={() => toggleSelect(avatar.id)}
                    >
                      {/* Avatar Image */}
                      <div className="relative overflow-hidden rounded-2xl bg-white/10 aspect-square">
                        <img
                          src={avatar.url}
                          alt={avatar.style}
                          className="w-full h-full object-cover"
                          style={{
                            filter: 'brightness(1.1) contrast(1.05)',
                          }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Selected Badge */}
                        {isSelected && (
                          <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                            <Check size={14} className="text-black" />
                          </div>
                        )}

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(avatar.id);
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Heart
                            size={16}
                            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                          />
                        </button>

                        {/* Action Buttons */}
                        <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(avatar);
                            }}
                            className="flex-1 py-1.5 bg-white/90 hover:bg-white rounded-lg text-black text-xs font-medium flex items-center justify-center gap-1"
                          >
                            <Download size={12} />
                            <span>保存</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(avatar);
                            }}
                            className="flex-1 py-1.5 bg-blue-500/90 hover:bg-blue-500 rounded-lg text-white text-xs font-medium flex items-center justify-center gap-1"
                          >
                            <Share2 size={12} />
                            <span>分享</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {generatedAvatars.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <p className="text-white/60 text-lg mb-4">暂无生成的头像</p>
            <button
              onClick={handleBackToHome}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
            >
              返回首页重新生成
            </button>
          </div>
        )}

        {/* Bottom Spacing */}
        <div className="h-24"></div>
      </div>

      {/* Preview Modal */}
      {previewAvatar && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewAvatar(null)}
        >
          <button
            onClick={() => setPreviewAvatar(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
          >
            ✕
          </button>
          
          <img
            src={previewAvatar.url}
            alt={previewAvatar.style}
            className="max-w-full max-h-full rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { styleCategories, styleOptions } from '@/data/styles';

export default function StyleSelectPage() {
  const [selectedCategory, setSelectedCategory] = useState(styleCategories[0].id);
  const { selectedStyles, toggleStyle, uploadedImages, setCurrentPage } = useAppStore();

  const filteredStyles = styleOptions.filter((style) => style.category === selectedCategory);

  const handleGenerate = () => {
    if (selectedStyles.length > 0) {
      setCurrentPage('generating');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentPage('upload')}
            className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            <span>返回</span>
          </button>
          <h1 className="text-xl font-bold text-white">选择风格</h1>
          <div className="w-16"></div>
        </header>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
              <span className="text-white/60 text-sm hidden sm:inline">上传照片</span>
            </div>
            <div className="flex-1 h-1 bg-white/40 mx-2 rounded">
              <div className="h-full bg-white/80 rounded" style={{ width: '100%' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">2</div>
              <span className="text-white text-sm hidden sm:inline">选择风格</span>
            </div>
            <div className="flex-1 h-1 bg-white/20 mx-2 rounded">
              <div className="h-full bg-white/20 rounded" style={{ width: '0%' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm">3</div>
              <span className="text-white/60 text-sm hidden sm:inline">生成头像</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {styleCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-300
                  ${selectedCategory === category.id
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Count */}
        <div className="max-w-2xl mx-auto mb-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
            <span className="text-white/80 text-sm">
              已选择: <span className="text-white font-semibold">{selectedStyles.length}</span> 种风格
            </span>
            {selectedStyles.length > 0 && (
              <button
                onClick={() => useAppStore.getState().clearSelectedStyles()}
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                清除选择
              </button>
            )}
          </div>
        </div>

        {/* Style Grid */}
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredStyles.map((style, index) => {
              const isSelected = selectedStyles.includes(style.id);
              return (
                <button
                  key={style.id}
                  onClick={() => toggleStyle(style.id)}
                  className={`
                    relative group p-4 rounded-2xl transition-all duration-300 animate-fade-in
                    ${isSelected
                      ? 'bg-white shadow-xl scale-105 ring-2 ring-yellow-400'
                      : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Style Icon */}
                  <div className="text-4xl mb-3">
                    {style.category === 'sci-fi' && '🛸'}
                    {style.category === 'anime' && '🎨'}
                    {style.category === 'art' && '🖼️'}
                    {style.category === 'professional' && '💼'}
                    {style.category === 'festival' && '🎊'}
                    {style.category === 'fantasy' && '✨'}
                  </div>
                  
                  {/* Style Name */}
                  <h3 className={`font-semibold text-sm mb-1 ${isSelected ? 'text-purple-600' : 'text-white'}`}>
                    {style.name}
                  </h3>
                  
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredStyles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">该分类暂无风格</p>
            </div>
          )}
        </div>

        {/* Bottom Action */}
        <div className="max-w-2xl mx-auto mt-8">
          {/* All Styles Button */}
          <button
            onClick={() => {
              // Select all styles in current category
              filteredStyles.forEach((style) => {
                if (!selectedStyles.includes(style.id)) {
                  toggleStyle(style.id);
                }
              });
            }}
            className="w-full py-3 mb-4 rounded-xl font-medium text-white/80 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            <span>全选当前分类</span>
          </button>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={selectedStyles.length === 0}
            className={`
              w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2
              ${selectedStyles.length > 0
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-lg hover:scale-105'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            <span>开始生成 ({selectedStyles.length} 种风格 × 10张)</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

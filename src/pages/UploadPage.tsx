import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Camera, AlertCircle } from 'lucide-react';
import { useAppStore, UploadedImage } from '@/store/useAppStore';

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { uploadedImages, addUploadedImage, removeUploadedImage, setCurrentPage } = useAppStore();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('请上传 JPG、PNG 或 WebP 格式的图片');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('图片大小不能超过 5MB');
      return false;
    }
    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const image: UploadedImage = {
        id: Math.random().toString(36).substring(7),
        file,
        url,
      };
      addUploadedImage(image);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(processFile);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(processFile);
    }
  };

  const handleContinue = () => {
    if (uploadedImages.length >= 1) {
      setCurrentPage('styles');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            <span className="text-2xl">←</span>
            <span>返回</span>
          </button>
          <h1 className="text-xl font-bold text-white">上传照片</h1>
          <div className="w-16"></div>
        </header>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <span className="text-white text-sm hidden sm:inline">上传照片</span>
            </div>
            <div className="flex-1 h-1 bg-white/20 mx-2 rounded">
              <div className="h-full bg-white/40 rounded" style={{ width: '0%' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm">2</div>
              <span className="text-white/60 text-sm hidden sm:inline">选择风格</span>
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

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Upload Area */}
        <div className="max-w-2xl mx-auto">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300
              ${isDragging
                ? 'border-white bg-white/10 scale-105'
                : 'border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50'
              }
            `}
          >
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
                📸
              </div>
              <div>
                <p className="text-white text-xl font-semibold mb-2">
                  点击上传或拖拽照片到这里
                </p>
                <p className="text-white/60 text-sm">
                  支持 JPG、PNG、WebP 格式，单张不超过 5MB
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Camera size={16} />
                  <span>拍照</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <ImageIcon size={16} />
                  <span>相册</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Tips */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span>💡</span> 上传建议
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>正面照、不同角度的照片效果更好</span>
              </li>
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>不同的表情（微笑、严肃等）</span>
              </li>
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>光线充足、清晰的照片</span>
              </li>
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>不要戴墨镜或口罩的照片</span>
              </li>
              <li className="flex items-start gap-3 text-white/80 text-sm">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>不要过度美颜或滤镜的照片</span>
              </li>
            </ul>
          </div>

          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">
                  已上传: {uploadedImages.length} 张
                </h3>
                <span className="text-white/60 text-sm">
                  {uploadedImages.length < 10 && '建议上传至少10张'}
                </span>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                {uploadedImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt="Uploaded"
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removeUploadedImage(image.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-8">
            <button
              onClick={handleContinue}
              disabled={uploadedImages.length === 0}
              className={`
                w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300
                ${uploadedImages.length > 0
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
                }
              `}
            >
              {uploadedImages.length > 0 ? '继续选择风格' : '请先上传照片'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

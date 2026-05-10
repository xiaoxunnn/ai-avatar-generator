import { create } from 'zustand';

export interface UploadedImage {
  id: string;
  file: File;
  url: string;
}

export interface StyleOption {
  id: string;
  name: string;
  icon: string;
  category: string;
  filter: string;
}

export interface GeneratedAvatar {
  id: string;
  url: string;
  style: string;
  thumbnail?: string;
}

interface AppState {
  uploadedImages: UploadedImage[];
  selectedStyles: string[];
  generatedAvatars: GeneratedAvatar[];
  selectedAvatar: GeneratedAvatar | null;
  isGenerating: boolean;
  generationProgress: number;
  currentPage: 'home' | 'upload' | 'styles' | 'generating' | 'results';
  
  addUploadedImage: (image: UploadedImage) => void;
  removeUploadedImage: (id: string) => void;
  clearUploadedImages: () => void;
  
  toggleStyle: (styleId: string) => void;
  clearSelectedStyles: () => void;
  
  setGeneratedAvatars: (avatars: GeneratedAvatar[]) => void;
  setSelectedAvatar: (avatar: GeneratedAvatar | null) => void;
  
  setGenerating: (status: boolean) => void;
  setGenerationProgress: (progress: number) => void;
  
  setCurrentPage: (page: AppState['currentPage']) => void;
  
  reset: () => void;
}

const initialState = {
  uploadedImages: [],
  selectedStyles: [],
  generatedAvatars: [],
  selectedAvatar: null,
  isGenerating: false,
  generationProgress: 0,
  currentPage: 'home' as const,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  
  addUploadedImage: (image) =>
    set((state) => ({
      uploadedImages: [...state.uploadedImages, image],
    })),
  
  removeUploadedImage: (id) =>
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((img) => img.id !== id),
    })),
  
  clearUploadedImages: () => set({ uploadedImages: [] }),
  
  toggleStyle: (styleId) =>
    set((state) => ({
      selectedStyles: state.selectedStyles.includes(styleId)
        ? state.selectedStyles.filter((id) => id !== styleId)
        : [...state.selectedStyles, styleId],
    })),
  
  clearSelectedStyles: () => set({ selectedStyles: [] }),
  
  setGeneratedAvatars: (avatars) => set({ generatedAvatars: avatars }),
  
  setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar }),
  
  setGenerating: (status) => set({ isGenerating: status }),
  
  setGenerationProgress: (progress) => set({ generationProgress: progress }),
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  reset: () => set(initialState),
}));

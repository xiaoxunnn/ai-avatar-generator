const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface GenerateAvatarRequest {
  images: string[];
  style: string;
  count?: number;
}

export interface GenerateAvatarResponse {
  success: boolean;
  data?: Array<{
    id: string;
    url: string;
    style: string;
    thumbnail?: string;
  }>;
  error?: string;
}

export async function generateAvatarAPI(request: GenerateAvatarRequest): Promise<GenerateAvatarResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API调用失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '网络请求失败',
    };
  }
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}

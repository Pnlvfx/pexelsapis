export type PexelsSearchOrientation = 'landscape' | 'portrait' | 'square';
export type PexelsSearchSize = 'large' | 'medium' | 'small';

export interface PexelsVideoOptions {
  per_page?: number;
  orientation?: PexelsSearchOrientation;
  size?: PexelsSearchSize;
  locale?: string;
  page?: number;
}

export interface PexelsImageOptions extends PexelsVideoOptions {
  color?: string;
}

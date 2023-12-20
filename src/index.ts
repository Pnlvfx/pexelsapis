import type { PexelsImageOptions, PexelsVideoOptions, PhotosWithTotalResults, Videos } from './types/index.js';

const isJson = (res: Response) => res.headers.get('Content-Type')?.includes('application/json');

const pexelsapis = (apiKey: string) => {
  const headers = {
    Authorization: apiKey,
  };
  return {
    getImage: async (q: string, options?: PexelsImageOptions) => {
      let url = `https://api.pexels.com/v1/search?query=${q}`;
      if (options) {
        for (const [key, value] of Object.entries(options)) {
          if (value === undefined) continue;
          url += `&${key}=${value}`;
        }
      }
      const res = await fetch(url, {
        method: 'GET',
        headers,
      });
      if (!isJson(res)) throw new Error(`${res.status}: ${res.statusText}`);
      const data: PhotosWithTotalResults = await res.json();
      if (!res.ok) throw new Error('Pexels API error.');
      return data.photos;
    },
    getVideo: async (q: string, options?: PexelsVideoOptions) => {
      let url = `https://api.pexels.com/videos/search?query=${q}`;
      if (options) {
        for (const [key, value] of Object.entries(options)) {
          if (value === undefined) continue;
          url += `&${key}=${value}`;
        }
      }
      const res = await fetch(url, {
        method: 'GET',
        headers,
      });
      if (!isJson(res)) throw new Error(`${res.status}: ${res.statusText}`);
      const data: Videos = await res.json();
      if (!res.ok || !data.videos) throw new Error(`Pexels: ${data.status} ${data.error}`);
      return data.videos;
    },
  };
};

export default pexelsapis;

import { PexelsImageOptions, PexelsVideoOptions, PhotosWithTotalResults, Videos } from './types/index.js';

const pexelsapis = (apiKey: string) => {
  const headers = {
    Authorization: apiKey,
  };
  return {
    getImage: async (text: string, options?: PexelsImageOptions) => {
      let url = `https://api.pexels.com/v1/search?query=${text}`;
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
      const data: PhotosWithTotalResults = await res.json();
      if (!res.ok) throw new Error('Pexels API error.');
      return data.photos;
    },
    getVideo: async (text: string, options?: PexelsVideoOptions) => {
      let url = `https://api.pexels.com/videos/search?query=${text}`;
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
      const data: Videos = await res.json();
      if (!res.ok || !data.videos) throw new Error(`Pexels: ${data.status} ${data.error}`);
      return data.videos;
    },
  };
};

export default pexelsapis;

console.log(process.argv[2]);

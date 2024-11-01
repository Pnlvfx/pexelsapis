import type { PexelsImageOptions, PexelsVideoOptions, PhotosWithTotalResults, Videos } from './types/response.js';
import coraline, { getEntries } from 'coraline';

const BASE_URL = 'https://api.pexels.com';

const pexelsapis = (apiKey: string) => {
  const headers = {
    Authorization: apiKey,
  };
  return {
    searchImages: async (q: string, options: PexelsImageOptions = {}) => {
      const query = new URLSearchParams({ query: q });
      for (const [key, value] of getEntries(options)) {
        if (value === undefined) continue;
        query.append(key, value.toString());
      }
      const res = await fetch(`${BASE_URL}/v1/search?${query.toString()}`, { headers });
      if (!res.ok || !coraline.isJson(res)) throw new Error(`${res.status.toString()}: ${res.statusText}`);
      return res.json() as Promise<PhotosWithTotalResults>;
    },
    searchVideos: async (q: string, options: PexelsVideoOptions = {}) => {
      const query = new URLSearchParams({ query: q });
      for (const [key, value] of getEntries(options)) {
        if (value === undefined) continue;
        query.append(key, value.toString());
      }
      const res = await fetch(`${BASE_URL}/videos/search?${query.toString()}`, { headers });
      if (!res.ok || !coraline.isJson(res)) throw new Error(`${res.status.toString()}: ${res.statusText}`);
      return res.json() as Promise<Videos>;
    },
    searchVideo: async (id: number) => {
      const res = await fetch(`${BASE_URL}/videos/videos/${id.toString()}`, { headers });
      if (!res.ok || !coraline.isJson(res)) throw new Error(`${res.status.toString()}: ${res.statusText}`);
      return res.json();
    },
  };
};

export default pexelsapis;

export type * from './types/response.js';

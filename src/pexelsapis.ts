import coraline, { getEntries } from 'coraline';
import type { PexelsImageOptions, PexelsVideoOptions, PhotosWithTotalResults, Videos } from './types/pexelsapis.js';

const pexelsapis = (apiKey: string) => {
  const headers = {
    Authorization: apiKey,
  };
  return {
    searchImages: async (q: string, options?: PexelsImageOptions) => {
      let url = `https://api.pexels.com/v1/search?query=${q}`;
      if (options) {
        for (const [key, value] of getEntries(options)) {
          if (value === undefined) continue;
          url += `&${key}=${value.toString()}`;
        }
      }
      const res = await fetch(url, { method: 'GET', headers });
      if (!res.ok) throw new Error('Pexels API error.');
      if (!coraline.isJson(res)) throw new Error(`${res.status.toString()}: ${res.statusText}`);
      return res.json() as Promise<PhotosWithTotalResults>;
    },
    searchVideos: async (q: string, options?: PexelsVideoOptions) => {
      let url = `https://api.pexels.com/videos/search?query=${q}`;
      if (options) {
        for (const [key, value] of getEntries(options)) {
          if (value === undefined) continue;
          url += `&${key}=${value.toString()}`;
        }
      }
      const res = await fetch(url, {
        method: 'GET',
        headers,
      });
      if (!coraline.isJson(res)) throw new Error(`${res.status.toString()}: ${res.statusText}`);
      if (!res.ok) throw new Error(`Pexels: ${res.status.toString()} ${res.statusText}`);
      return res.json() as Promise<Videos>;
    },
  };
};

export default pexelsapis;

export type {
  Collection,
  ErrorResponse,
  Medium,
  PaginationParams,
  Params,
  PexelsImageOptions,
  PexelsVideoOptions,
  Photo,
  Photos,
  PhotosWithTotalResults,
  Video,
  VideoFile,
  VideoFilterParams,
  Videos,
} from './types/pexelsapis.js';

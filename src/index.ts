import fs from 'node:fs';
import https from 'node:https';
import { PexelsImageOptions, PexelsVideoOptions, Photo, PhotosWithTotalResults, Video, Videos } from './types';

const pexelsapis = (apiKey: string) => {
  const headers = {
    Authorization: apiKey,
  };
  return {
    getImage: async (text: string, options?: PexelsImageOptions): Promise<Photo[]> => {
      let url = `https://api.pexels.com/v1/search?query=${text}`;
      if (options) {
        const usedOptions = Object.entries(options).filter(([, value]) => value !== undefined);
        for (const [key, value] of usedOptions) {
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
    getVideo: async (text: string, options?: PexelsVideoOptions): Promise<Video[] | undefined> => {
      let url = `https://api.pexels.com/videos/search?query=${text}`;
      if (options) {
        const usedOptions = Object.entries(options).filter(([, value]) => value !== undefined);
        for (const [key, value] of usedOptions) {
          url += `&${key}=${value}`;
        }
      }
      const res = await fetch(url, {
        method: 'GET',
        headers,
      });
      const data: Videos = await res.json();
      if (!res.ok) throw new Error(`Pexels: ${data.status} ${data.error}`);
      return data.videos;
    },
    downloadVideo: (url: string, output: string) => {
      return new Promise<string>((resolve, reject) => {
        const downloadVideo = (url: string) => {
          https.get(url, (res) => {
            if (res.statusCode === 302) {
              url = res.headers.location as string;
              downloadVideo(url);
              return;
            }
            if (res.statusCode !== 200) {
              res.resume();
              reject('Something went wrong when downloading a video from Pexels');
            }
            res.pipe(fs.createWriteStream(output));
            res.on('close', () => {
              resolve(output);
            });
          });
        };
        downloadVideo(url);
      });
    },
  };
};

export default pexelsapis;

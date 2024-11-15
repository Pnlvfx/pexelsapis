/* eslint-disable no-console */
import { describe, it } from '@jest/globals';
import pexelsapis from '../src/pexelsapis.js';

const apiKey = process.env['PEXELS_API_KEY'];
if (!apiKey) throw new Error('Please provide a pexels api key.');
const client = pexelsapis(apiKey);

describe('pexelsapis', () => {
  it('Should search a videos, then search the same video on the video api.', async () => {
    const { videos } = await client.searchVideos('Cars');
    for (const video of videos) {
      const singleVideo = await client.getVideo(video.id);
      console.log({ singleVideo });
      break;
    }
  });
});

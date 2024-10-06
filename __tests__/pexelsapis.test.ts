import { describe, it } from '@jest/globals';
import pexelsapis from '../src/pexelsapis.js';

describe('peelsapis', () => {
  it('it fail', async () => {
    await pexelsapis('').searchImages('Trump');
  });
});

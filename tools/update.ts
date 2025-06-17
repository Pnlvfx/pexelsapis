#!/usr/bin/env node
/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';
import { updateLocalDeps } from '@goatjs/updater';

const packages = {
  '@goatjs/ts-unused-exports': 'github:Pnlvfx/goatjs#workspace=@goatjs/ts-unused-exports',
  '@goatjs/node': 'github:Pnlvfx/goatjs#workspace=@goatjs/node',
  '@goatjs/typescript-config': 'github:Pnlvfx/typescript-config',
  '@goatjs/eslint': 'github:Pnlvfx/eslint',
  '@goatjs/rimraf': 'github:Pnlvfx/goatjs#workspace=@goatjs/rimraf',
  '@goatjs/core': 'github:Pnlvfx/goatjs#workspace=@goatjs/core',
};

try {
  await execAsync('yarn up @goatjs/updater@github:Pnlvfx/goatjs#workspace=@goatjs/updater');
  await updateLocalDeps(packages);
  process.exit(0);
} catch (err) {
  console.log(err);
  process.exit(1);
}

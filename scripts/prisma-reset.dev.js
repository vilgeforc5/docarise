#!/usr/bin/env node
const { execSync } = require('child_process');

if (process.env.MODE === 'development') {
  console.log('Running Prisma reset in development...');
  execSync(
    'npx prisma migrate reset --schema libs/prisma/prisma/schema.prisma',
    { stdio: 'inherit' },
  );
} else {
  console.log('Skipping Prisma reset: MODE is not development');
}

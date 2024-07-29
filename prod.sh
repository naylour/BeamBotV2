# cd apps/web && bun run ./build/index.js
# cd apps/bot && bun run ./src/index.ts


cd apps/web && pm2 start --interpreter ~/.bun/bin/bun ./build/index.js &
cd apps/bot && pm2 start --interpreter ~/.bun/bin/bun ./src/index.ts &
cd packages/db && pm2 start bun -- db:studio
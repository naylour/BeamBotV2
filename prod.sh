# cd apps/web && bun run ./build/index.js
# cd apps/bot && bun run ./src/index.ts


pm2 start --interpreter ~/.bun/bin/bun ./apps/web/build/index.js &
pm2 start --interpreter ~/.bun/bin/bun ./apps/bot/src/index.ts &
# cd packages/proxy && bun dev &
cd packages/db && pm2 start bun -- db:studio
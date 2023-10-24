FROM oven/bun AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /usr/src/app

# Install dependencies based on the preferred package manager
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Rebuild the source code only when needed
FROM deps AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build
RUN ls -al

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "server.js" ]

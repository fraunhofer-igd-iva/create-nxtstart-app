# Based on https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:20.5.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

<§yarn§># Yarn --------------------------------------------------------------------------
RUN corepack enable
COPY .yarn ./.yarn
</§yarn§>
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* .npmrc* .yarnrc.yml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --immutable; \
    elif [ -f package-lock.json ]; then npm ci --force; \
    else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV BUILD_STANDALONE=1

RUN \
  if [ -f yarn.lock ]; then <§prisma§>yarn prisma generate && </§prisma§>yarn run build; \
    elif [ -f package-lock.json ]; then <§prisma§>npx prisma generate && </§prisma§>npm run build; \
    else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown -R nextjs:nodejs .next

<§prisma§># Prisma ------------------------------------------------------------------------
COPY --from=builder /app/prisma ./prisma
</§prisma§>
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

# Based on https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:20.5.0-alpine AS base

# Install dependencies only when needed
FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

<§yarn§># Yarn --------------------------------------------------------------------------
# NEW enable yarn 4.0.2 version and copy yarnrc.yml
RUN corepack enable
COPY .yarn ./.yarn
</§yarn§>
# Install dependencies based on the preferred package manager (NEW copy yarnrc.yml to the image)
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .yarnrc.yml* ./

# use this line if you have dependencies that for some reason need global typescript
# RUN npm install typescript -g

RUN \
  if [ -f yarn.lock ]; then yarn --immutable; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
WORKDIR /app
# COPY --from=builder /app/.yarn ./.yarn
# COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
if [ -f yarn.lock ]; then <§prisma§>yarn prisma generate && </§prisma§>yarn run build; \
elif [ -f package-lock.json ]; then <§prisma§>npx prisma generate && </§prisma§>npm run build; \
else echo "Lockfile not found." && exit 1; \
fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# adjust files to your package manager and packages
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/i18nConfig.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
<§yarn§># Yarn --------------------------------------------------------------------------
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
</§yarn§><§npm§># NPM ---------------------------------------------------------------------------
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package-lock.json ./package-lock.json
</§npm§><§prisma§># Prisma ------------------------------------------------------------------------
COPY --from=builder /app/prisma ./prisma
</§prisma§>
# use this line if you have dependencies that for some reason need global typescript
# RUN npm install typescript -g

# Note rebuild again - this is to let the package manager rebuild binaries in the "runner" stage of the Dockerfile
<§yarn§># We also have to remove unplugged, so that rebuilding happens and replaces the old binaries
RUN rm -rf /app/.yarn/unplugged && yarn rebuild
</§yarn§>

# Set the correct permission for prerender cache
RUN chown -R nextjs:nodejs /app/.next
<§yarn§>RUN chown -R nextjs:nodejs /app/.yarn
</§yarn§>

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
# ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
<§yarn§>CMD ["yarn", "start"]
</§yarn§><§npm§>CMD ["npm", "run", "start"]
</§npm§>

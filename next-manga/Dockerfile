# Install dependencies only when needed
FROM node:14.20.0-alpine3.16 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM node:14.20.0-alpine3.16 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY /package.json .
COPY /public ./public
COPY /src ./src
COPY /next.config.prod.js ./next.config.js
COPY /postcss.config.js .
COPY /tailwind.config.js .
COPY /tsconfig.json .
COPY /next-env.d.ts .
COPY /.env.prod ./.env
COPY /styled-components.d.ts .

RUN yarn build

FROM node:14.20.0-alpine3.16 AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
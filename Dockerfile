# Etapa base
FROM node:20.14.0-bullseye AS base

# Instalar dependencias solo cuando sea necesario
FROM base AS deps
RUN apt-get update && apt-get install -y libc6
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Crear el directorio .next/cache con los permisos adecuados
RUN mkdir -p /app/.next/cache && chmod -R 777 /app/.next/cache

# Ejecutar prisma init, sleep, prisma generate y sleep antes de la construcción
COPY prisma ./prisma
RUN npx prisma init && sleep 10
RUN npx prisma generate && sleep 10

RUN yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Ejecutar migraciones antes de iniciar el servidor
CMD sleep 10 && npx prisma migrate deploy && sleep 10 && node server.js

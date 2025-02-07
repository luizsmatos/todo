FROM node:22.13.1-alpine AS builder

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY src/shared/infrastructure/persistence/prisma ./src/shared/infrastructure/persistence/prisma/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec prisma generate --schema=./src/shared/infrastructure/persistence/prisma/schema.prisma

RUN pnpm run build

FROM node:22.13.1-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/src/shared/infrastructure/persistence/prisma ./src/shared/infrastructure/persistence/prisma
COPY --from=builder /usr/src/app/package.json /usr/src/app/pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start:prod"]
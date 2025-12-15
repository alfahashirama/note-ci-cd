# Étape 1 : Build TypeScript
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Étape 2 : Image finale
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm ci --only=production

EXPOSE 5000

# Migration avec --url direct (pas de config.json) + démarrage
CMD ["sh", "-c", "npx sequelize-cli db:migrate --url $DATABASE_URL && node dist/index.js"]
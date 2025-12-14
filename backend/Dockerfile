# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers package pour installer les deps
COPY package*.json ./
# Installe TOUTES les dépendances (y compris dev pour le build)
RUN npm ci

# Copie du code source
COPY . .

# Compilation TypeScript → JavaScript
RUN npm run build

# Étape 2 : Image finale légère (seulement runtime)
FROM node:20-alpine

WORKDIR /app

# Copie seulement les fichiers nécessaires depuis l'étape builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma 
# Installe seulement les dependencies de production
RUN npm ci --only=production

# Expose le port
EXPOSE 5000

# Commande : migrations Sequelize + démarrage
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node dist/index.js"]
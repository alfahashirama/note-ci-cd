# Étape 1 : Build de l'application TypeScript
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers package
COPY package*.json ./

# Installe toutes les dépendances (y compris devDependencies pour tsc)
RUN npm ci

# Copie du code source complet
COPY . .

# Compilation TypeScript → JavaScript
RUN npm run build

# Étape 2 : Image finale légère (runtime seulement)
FROM node:20-alpine

WORKDIR /app

# Copie uniquement ce qui est nécessaire depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Installe uniquement les dépendances de production
RUN npm ci --only=production

# Expose le port
EXPOSE 5000

# Commande de démarrage : migrations Sequelize + lancement serveur
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node dist/index.js"]
# Étape 1 : Compilation TypeScript
FROM node:20-alpine AS builder

WORKDIR /app

# Copie package.json et lock
COPY package*.json ./

# Installe toutes les dépendances (incluant dev pour tsc et sequelize-cli)
RUN npm ci

# Copie tout le code source
COPY . .

# Compile TypeScript → JavaScript
RUN npm run build

# Étape 2 : Image finale légère
FROM node:20-alpine

WORKDIR /app

# Copie uniquement ce qui est nécessaire
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Installe seulement les dépendances de production
# (sequelize-cli est dans devDependencies → on ne l'installe pas ici)
RUN npm ci --only=production

# Expose le port
EXPOSE 5000

# Démarrage DIRECT sans sequelize-cli (on applique les migrations manuellement dans le code)
CMD ["node", "dist/index.js"]
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Extension UUID + migrations
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm run start"]

EXPOSE 5000
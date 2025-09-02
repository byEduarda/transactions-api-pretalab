# Stage 1: build
FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./
RUN npm install

# Copia todo o código
COPY . .

# Compila TypeScript para JavaScript
RUN npm run build

# Stage 2: produção
FROM node:20-alpine

WORKDIR /app

# Copia a build do stage anterior
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm install --production

# Expõe a porta que Cloud Run espera
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "dist/server.js"]
# Development container only — hot reload via volume mount.
# For production use Dockerfile.prod + docker-compose.prod.yml

FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

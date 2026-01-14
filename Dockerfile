# =============== #
# Stage 1: Build  #
# =============== #
FROM node:22 AS builder

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./
RUN npm install -f

COPY . .

RUN npx prisma generate
RUN mkdir -p dist/src/generated && cp -r src/generated/* dist/src/generated/

RUN npm run build


# =================== #
# Stage 2: Production #
# =================== #
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install -f

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/prisma ./prisma

COPY package.json ./dist/package.json

EXPOSE 9000
CMD ["node", "dist/src/app.js"]

FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g pm2

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]

FROM node:latest

WORKDIR /app

COPY . .

ENV PORT=4000

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]
# Docker-basics

# Create a docker file

Contents
---------------------------
FROM node:latest

WORKDIR /app

COPY . .

ENV PORT=4000

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]


Docker Commands

- `docker build -t paulvitalis/node:latest .` - Builds an image
- `docker run paulvitalis/node` - Runs a docker image
- `docker run -p 5000:4000 paulvitalis/node`  - Runs a docker image on the specified port
- `docker run -d paulvitalis/node` - Runs a docker image in daemon mode
- `docker ps` - Lists all the running containers
- `docker rm [id]` - Removes a certain container
- `docker images` - Lists all the running images
- `docker stop [id]` - Stops a certain running container 
- `docker exec -it [id] bash` - Starts a docker interactive bash of the specific container

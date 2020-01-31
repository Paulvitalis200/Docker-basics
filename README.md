# Docker-basics

# 1. Creating a docker file

Contents of the docker file on the root directory
---------------------------
FROM node:latest

WORKDIR /app

COPY . .

ENV PORT=4000

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]

NB: Entrypoint should be the start command for your app

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


# 2. VOLUMES
Build containers by giving them names as follows:
- `docker run -d -p 8000:3000 --name my-container paulvitalis/node`

Chain commands to stop, remove, build and run a container again e.g
- `docker stop my-container && docker rm my-container && docker build -t chrisnoring/node . && docker run -d -p 8000:3000 --name my-container chrisnoring/node`

But that is not efficient.
We, therefore, use volumes
Volumes or data volumes is a way for us to create a place in the host machine where we can write files so they are persisted. 

# Volume commands
Creating volumes
- `docker volume create [name of volume]`

To list out volumes

- `docker volume create [name of volume]`

To remove unused volumes
- `docker volume prune`

To remove a single volume
- `docker volume rm [name of volume]`

To inspect volumes
- `docker inspect [name of volume]`

# Mounting volumes
Used in conjuncture with running a container it would look like this for example:

- `docker run -d -p 8000:3000 --name my-container --volume [name-of-volume]:/[directory in container] paulvitalis/node`

To locate your volume
- `docker exec -it my-container bash`

Next you navigate to the directory that you specified

# Mounting a subdirectory as a volume
Steps
- Create a directory, let’s create a directory /logs
- create a file, let’s create a file logs.txt and write some text in it
- run our container, let’s create a mount point to our local directory + /logs

The run command is as follows
- `docker run -p 8000:4000 --name my-container --volume $(pwd)/logs:/logs paulvitalis/node`
The first argument is $(pwd)/logs which means our current working directory and the subdirectory logs. The second argument is /logs which means we are saying mount our host computers logs directory to a directory with the same name in the container.
<img width="755" alt="Screenshot 2020-01-31 at 14 42 41" src="https://user-images.githubusercontent.com/10106044/73537139-c7d98480-4438-11ea-8ccb-bdc7bd1bab2d.png">

If we edit the logs.txt file and run cat logs.txt we notice a different outcome

# Treating our application as a volume

Run `docker kill my-container && docker rm my-container` first
Thereafter we need to rerun our container this time with a different volume argument namely 
`--volume $(PWD):/app`

The whole command looks as follows:
`docker run -p 8000:4000 --name my-container --volume $(pwd):/app paulvitalis/node`

When we now add a route in our app or make a change and run the app, our changes will be reflected
NB: Ensure you have nodemon running
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
- `docker run --name sidehustle-image -p 4680:3000 -d paulvitalis/sidehustle-image` - Runs a docker image on the specified port in daemon mode


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

# 3. Linking and Databases

Commands
- Make sure that your mysql server is runnin. `brew services start`
- Connect to a database by running `mysql -uroot`
- Once in the mysql terminal, you can create a database by typing: `CREATE database_name`
- Select the new database name to query from it by typing: `USE database_name`
- Create a table and link it to our database 
<img width="837" alt="Screenshot 2020-02-03 at 14 38 07" src="https://user-images.githubusercontent.com/10106044/73651424-7417a700-4695-11ea-8ac2-344840dcd7d8.png">
<img width="769" alt="Screenshot 2020-02-03 at 14 38 24" src="https://user-images.githubusercontent.com/10106044/73651425-74b03d80-4695-11ea-8bfb-997591a1ac49.png">
- Next try to run a mysql image. We use the command `docker run --name=mysql-db mysql`
- Database is uninitialized, password option is not specified and so on. We fix that by running: `docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=complexpassword -d -p 8001:3306 mysql`

- The problem we get that our container is up and running despite the error it threw 
- So we bring down the container first using: `docker rm mysql-db`
- Now we can run it again with the database set as above: `docker run -d -p 8001:3006 --name mysql-db -e MYSQL_ROOT_PASSWORD=complexpassword mysql`
- To connect to it from the outside, we connect to it on 0.0.0.0:8001:
  `mysql -uroot -pcomplexpassword -h 0.0.0.0 -P 8001`

Connecting to database from Node.js
- First we install the npm package for MYSQL: `npm install mysql`
- Then we add the following code to the top of our app.js file:
<img width="858" alt="Screenshot 2020-02-03 at 14 47 50" src="https://user-images.githubusercontent.com/10106044/73651426-74b03d80-4695-11ea-8254-bb83da3b878d.png">
- Next we go to the terminal and run: `mysql -uroot -pcomplexpassword -h 0.0.0.0 -P 8001` and type the following after
<img width="831" alt="Screenshot 2020-02-03 at 14 48 33" src="https://user-images.githubusercontent.com/10106044/73651428-74b03d80-4695-11ea-9abf-7043a15ae942.png">
- Now we can run our app! `node app.js`

Linking
- To link a container to a database, We update the app.js to look as follows
<img width="689" alt="Screenshot 2020-02-03 at 15 00 34" src="https://user-images.githubusercontent.com/10106044/73651673-f43e0c80-4695-11ea-9fde-bb4fe9e31823.png">

- We build our image `docker build - t paulvitalis/node .`
- Then we run our image `docker run -d -p 8000:3000 --name my-container --link mysql-db:mysql paulvitalis/node`
- To see the output we run `docker logs my-container`

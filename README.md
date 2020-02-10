# DOCKER COMPOSE

- Create a `docker-compose.yaml` file on the root directory
- Specify in the file the version of docker compose and which services you  would like to run e.g
```
version: '3'
services: 
    product-service:
        build: 
            context: ./product-service
        ports:
            - "8000:3000"
    inventory-service:
        build:
            context: ./inventory-service
        ports:
            - "8001:3000"
```
- Run `docker-compose up` to build an image, create a container and run the container
- Run `docker-compose down` to stop and remove the container

CAVEAT, it's not so simple just to run `docker-compose up`, that works fine for a first-time build + run, where no images exist previously. If you are doing a change to a service, however, that needs to be rebuilt, that would mean you need to run `docker-compose build` first and then you need to run `docker-compose up`.

# Environment variables
- We can set environment variables in the `docker-compose.yaml` file.
<img width="676" alt="Screenshot 2020-02-11 at 01 17 34" src="https://user-images.githubusercontent.com/10106044/74196407-31923380-4c6e-11ea-8938-4e142723f206.png">
- To check that we have actually created this, we can run 
 `docker exec [name-of-container] env`

# Volumes
- To create a volume in the `docker-compose` file, we do the following
<img width="510" alt="Screenshot 2020-02-11 at 01 19 47" src="https://user-images.githubusercontent.com/10106044/74196422-3d7df580-4c6e-11ea-9796-bda4fa33ded4.png">

- To check that the volume is there, run `docker exec -it [container-id] bash` and navigate to the mapping directory

- To view all volumes we run `docker volume ls`
- To view details of an individual volume, `docker volume inspect [name of volume]`

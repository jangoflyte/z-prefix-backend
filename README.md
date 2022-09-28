# Z-prefix Backend


## Useful Commands
- postgres: `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`
- bash: `docker exec -it <container-id> -bash`
- docker-compose: ` docker-compose down --rmi all`
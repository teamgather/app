#!/bin/bash

# variable
IMAGE="ghcr.io/teamgather/app:prod"

# image
docker pull $IMAGE

# container
if [ $(docker ps -qa --filter name=^/GATHER_APP$) ] 
then 
  docker rm -f GATHER_APP
fi

docker run \
  --name GATHER_APP \
  --restart unless-stopped \
  -e "VIRTUAL_HOST=gather.team,www.gather.team" \
  -e "VIRTUAL_PORT=3100" \
  -e "LETSENCRYPT_HOST=gather.team,www.gather.team" \
  -e "LETSENCRYPT_EMAIL=tnitsiri@hotmail.com" \
  -d $IMAGE

# clear unuse images
docker image prune -f
docker system prune -af

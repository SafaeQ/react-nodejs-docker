# Instal WSL 2

<https://www.youtube.com/watch?v=_fntjriRe48>

# Install docker

<https://www.youtube.com/watch?v=5RQbdMn04Oc>

# docker commands

- create a network, and give it a name of hotel-booking-net
  - docker network create hotel-booking-net
- run a container based on mongo image, and name it hotel-booking-db and make it use hotel-booking-net network
  - docker container run -d --name hotel-booking-db -v hotel-booking-db:/data/db --network hotel-booking-net mongo
- cd to server folder where Dockerfile is and build that image and name it hotel-booking-docker:test
  - docker build -t hotel-booking-docker:test .
- run a container based on that image you just create, and name it hotel-booking and make it use hotel-booking-net network
  - docker container run -d --name hotel-booking -v ${pwd}:/app -v /app/node_modules --network hotel-booking-net -p 80:80 hotel-booking-docker:test

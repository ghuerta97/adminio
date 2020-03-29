FROM debian:9

COPY --from=node:10.16.0 / /

RUN npm install -g @angular/cli@8.1.1

WORKDIR /usr/src/fronted

COPY package*.json /usr/src/fronted/

RUN npm install

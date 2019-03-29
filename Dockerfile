# Setup and build the client

FROM node:11.2.0-alpine as client

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm install -qy
COPY client/ ./
RUN npm run build


# Setup the server

FROM node:11.2.0-alpine

WORKDIR /usr/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/app/
COPY package*.json ./
RUN npm install -qy
COPY ./ ./

EXPOSE 8888

CMD ["npm", "start"]
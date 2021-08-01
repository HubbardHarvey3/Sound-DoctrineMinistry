FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY server ./server/
COPY dist/* ./dist/SoundDoctrine

RUN npm install

CMD [ "node", "server/server.js" ]


EXPOSE 3000


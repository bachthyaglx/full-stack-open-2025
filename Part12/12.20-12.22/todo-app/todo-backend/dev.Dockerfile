FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Install nodemon globally for dev server auto-restarts
RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "--inspect", "index.js"]

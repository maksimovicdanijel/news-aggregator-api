FROM node:boron

WORKDIR /opt/api
COPY package.json .
RUN npm install

CMD ["npm", "start"]








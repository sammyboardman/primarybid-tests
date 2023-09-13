FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run test
CMD [ "node", "dist/index.js" ]

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]
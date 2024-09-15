FROM node

WORKDIR /chatapp

COPY  package*.json .

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm" , "start"]
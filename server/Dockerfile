FROM node

WORKDIR /chatapp

COPY  package*.json .

RUN npm install

EXPOSE 4000

COPY . .

CMD ["npm" , "run", "dev"]
FROM node

WORKDIR /app/build

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY ../.. .

EXPOSE 3000

CMD ["yarn", "run", "prod"]

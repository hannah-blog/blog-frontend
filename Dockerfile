FROM node

WORKDIR /app/build

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build
RUN yarn export

EXPOSE 3000

CMD ["yarn", "run", "prod"]


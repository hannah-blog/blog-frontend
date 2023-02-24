FROM node

WORKDIR /app/build

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY ../.. .

EXPOSE 3000

CMD ["yarn", "run", "prod"]
#
#FROM nginx
#
## nginx 의 default.conf 를 삭제
#RUN rm /etc/nginx/conf.d/default.conf
#
## host pc 의 nginx.conf 를 아래 경로에 복사
#COPY ./nginx.conf /etc/nginx/conf.d
#
## 80 포트 오픈
#EXPOSE 80 443
#
## container 실행 시 자동으로 실행할 command. nginx 시작함
#CMD ["nginx", "-g", "daemon off;"]

FROM node:10

ENV HOME=/home/cms-utilization-api
ENV NODE_ENV=production

RUN useradd --user-group --create-home cms-utilization-api

USER $APP_USER
WORKDIR $HOME/app

COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
COPY package.json package.json

RUN cd /tmp && npm i \
  && mkdir -p $HOME/app \
  && cd $HOME/app \
  && ln -s /tmp/node_modules

COPY tsconfig.json .
COPY tslint.json .

VOLUME /var/logs/cms-utilization-api/

EXPOSE 8042
CMD npm run start

COPY config config
COPY src src

RUN node_modules/.bin/tsc \
  && chown -R cms-utilization-api:cms-utilization-api $HOME/*

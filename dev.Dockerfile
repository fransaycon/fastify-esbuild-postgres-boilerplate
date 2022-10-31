FROM node:18.12

WORKDIR /app
COPY ./src /app/src
COPY ./package.json /app
COPY ./tsconfig.json /app
COPY ./jest.config.js /app
COPY ./yarn.lock /app

RUN yarn install --frozen-lockfile
CMD yarn dev

EXPOSE 8000

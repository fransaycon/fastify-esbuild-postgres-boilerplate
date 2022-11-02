FROM node:18.12

WORKDIR /app
COPY ./package.json /app
COPY ./yarn.lock /app
RUN yarn install --frozen-lockfile

COPY ./tsconfig.json /app
COPY ./jest.config.js /app
COPY ./tests /app/tests
COPY ./knexfile.js /app
COPY ./migrations /app/migrations

COPY ./src /app/src
CMD yarn knex migrate:latest && yarn dev

EXPOSE 8000

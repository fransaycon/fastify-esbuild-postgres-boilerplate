FROM node:18.13

WORKDIR /app
COPY ./package.json /app
COPY ./pnpm-lock.yaml /app
RUN npm install -g pnpm@7.25
RUN pnpm install --frozen-lockfile

COPY ./tsconfig.json /app
COPY ./jest.config.js /app
COPY ./tests /app/tests
COPY ./knexfile.js /app
COPY ./migrations /app/migrations

COPY ./src /app/src
CMD pnpm knex migrate:latest && pnpm dev

EXPOSE 8000

# Fastify+Esbuild+Postgres Boilerplate

## Let the magic begin~
You technically just need node+yarn and docker installed properly and a good internet ;)

**To make all the nice things work properly, (installs everything you need and prepares commmit automations)**
```
yarn
yarn prepare
```

**To turn on everything,**
```
docker-compose build (I highly recommend doing this first especially for first time installs)
docker-compose up
```

Now create a GET request to `localhost:8000/v1` and it should return `{"status": ok}`. It means it's working!

**To run tests,**
```
docker-compose run fastify-server yarn test
```

**To commit and trigger commitizen / lint staging,**
```
yarn commit
```
TIP: I highly suggest you check your lint stage first with `yarn lint` since you might need to redo everything if a check failed. (sorta a punishment >:P).

**To release something and update the CHANGELOG automatically complete with tags,**
```
yarn release
```

**To create migrations,**
```
yarn knex migrate:make <insert migration name here>
```

## What is included?
- Complete fastify setup with autoload of plugins and routes
- A postgres server both for testing local development and unit test purposes.
- A postgres admin accessible at `localhost:5050` with username `admin@admin.com` and password  `root`
- A swagger API docs automatically generated from route definitions accessible at `localhost:8000/documentation` (port is 8000 by default.)
- Commitizen powered commits with pre commit hook checks with eslint and prettier w/ lint-staged and commitlint.
- Commitizen powered releases with standard-version that auto generates a CHANGELOG.md


## Deployment
To prepare the artifacts with esbuild,
```
yarn build
```

To run migrations,
```
yarn knex migrate:latest
```

Your server should be available at `build/index.js` and runnable with node normally. (of course don't use node purely unless you intend a Kubernetes or Docker Swarm setup.)

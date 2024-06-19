# PortfolioFrontendYavirac

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Docker

### init any project
```
FROM node:current-alpine3.20

WORKDIR /app

RUN npm install -g @angular/cli

CMD ["ng", "new", "portfolio-frontend-yavirac", "--standalone","false"]

```
### Create the image
```docker build -t angular-cli .```

### run the container and create the project

```
docker run -it --rm -v ${PWD}:/app angular-cli
```

---

### Inside the project
Dockerfile
```
  FROM node:20-alpine as development 
  WORKDIR /app

  RUN apk update && apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      git

  ENV CHROME_BIN=/usr/bin/chromium-browser
  ENV LIGHTHOUSE_CHROMIUM_PATH=/usr/bin/chromium-browser

  ENV PATH="/home/appuser/.npm-global/bin:${PATH}"
  RUN npm install -g @angular/cli

  COPY package*.json ./
  RUN npm install

  COPY . .
  EXPOSE 4200

  CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]


  FROM node:20-alpine  AS build

  WORKDIR /app

  RUN npm install -g @angular/cli

  COPY package*.json ./

  RUN npm install

  COPY . .

  RUN ng build --prod
```

docker-compose.yml
```
  services:
  angular-test:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    command: ["ng", "test", "--no-watch", "--progress", "--browsers=ChromeHeadlessNoSandbox"]
    #command: ["ng", "test", "--watch", "--progress", "--browsers=ChromeHeadlessNoSandbox"]
  angular-app:
    build:
      context: .
      target: development
    ports:
      - "4200:4200"
    volumes:
      - .:/app
      - /app/node_modules
    command: ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
  angular-cli:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    entrypoint: [""]
  angular-prod:
    build:
      context: .
      target: build
    ports:
      - "80:80"

```

# To execute the test
```
docker-compose run --rm angular-cli ng generate config karma
```

karma.config.js

```module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'ChromeHeadlessNoSandbox'],
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
        ]
      }
    },
    singleRun: false
  });
};
```

### How to run
  
  ```
  docker-compose up --build angular-app
  docker-compose run --rm angular-test
  docker-compose run --rm angular-cli ng generate component my-new-component
  docker-compose up --build angular-prod
  ```

---

### Continuos integration

create .github/workflows/ci.yml

```
name: Docker run tests

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:

  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Build the Docker image
      run: |
        docker-compose build angular-test
        docker-compose run --rm angular-test
```

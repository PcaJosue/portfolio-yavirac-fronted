FROM node:current-alpine3.20 as development 
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


  FROM node:current-alpine3.20 AS build

  WORKDIR /app
  RUN npm install -g @angular/cli
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN ng build

  #stage 3
  FROM nginx:alpine AS production

  COPY --from=build /app/dist/portfolio-yavirac-frontend /usr/share/nginx/html
  COPY nginx.conf /etc/nginx/nginx.conf

  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
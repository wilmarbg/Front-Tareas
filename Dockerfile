FROM node:latest as builder
WORKDIR /app

# Copia el package.json y ejecuta npm install
COPY package*.json ./
RUN npm install
#COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
RUN npm install

COPY . .


RUN npm run build
# Build step 2(Deploying build on NGINX)
FROM nginx:1.13
RUN rm -rf /var/lib/apt/lists/*
#apt-get update \
#  && apt-get install -y wget \
#  && rm -rf /var/lib/apt/lists/*
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf:ro
COPY --from=builder /app/dist/admin/browser /usr/share/nginx/html
EXPOSE 80


FROM node:20-alpine AS build
COPY . /home/app/
RUN npm install -g @angular/cli@17.3.8
WORKDIR /home/app/
RUN npm install && ng build

FROM nginx:stable-alpine-slim
COPY --from=build /home/app/dist/sgcmapp/browser/ /usr/share/nginx/html
COPY --from=build /home/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

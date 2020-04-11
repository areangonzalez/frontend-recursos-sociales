FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx.conf /etc/nginx/conf.d/

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY dist/frontend-recursos-sociales /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

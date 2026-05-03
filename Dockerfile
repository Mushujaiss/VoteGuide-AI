FROM nginx:alpine

# Copy the built app to nginx
COPY dist/ /usr/share/nginx/html/

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

# Base image
FROM node:12.18.3-alpine3.9 AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --force

# Bundle app source
COPY . .


# Build app
RUN npm run build --prod
FROM nginx:1.19.8-alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html/


# Expose port
EXPOSE 8056

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


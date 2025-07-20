# Use an official Node.js runtime as the base image
FROM node:18 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular app to the container
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use a lightweight web server to serve the app
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist/admin-dash  /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
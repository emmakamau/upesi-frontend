# Step 1: Build the React application
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Step 2: Serve the app using a lightweight server like Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 90
CMD ["nginx", "-g", "daemon off;"]

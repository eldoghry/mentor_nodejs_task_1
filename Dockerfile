FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm config set strict-ssl false
ARG NODE_ENV
RUN if ["$NODE_ENV" = "production"]; then npm install --only=production; else npm install; fi
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
# Use official lightweight Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copy package.json and package-lock.json first for caching
COPY package*.json ./

RUN npm install --production

# Copy app source
COPY . .

# Expose the application port
EXPOSE 8000

# Start the Express.js application
CMD ["node", "--loader", "ts-node/esm", "./index.js"]
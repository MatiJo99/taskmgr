FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install --production

# Copy app code
COPY . .

# Set entrypoint
ENTRYPOINT ["node", "cli.js"]

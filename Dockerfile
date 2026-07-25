# Use Node 20 alpine version for a lightweight and secure image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install only production dependencies for smaller image footprint
RUN npm ci --only=production

# Copy the rest of the backend files
COPY . .

# Railway automatically sets the PORT environment variable
# We expose a default fallback port as documentation
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]

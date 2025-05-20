# Use official Node image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy app files and set permissions
COPY --chown=node:node . .

# Install dependencies with clean, reliable build
RUN npm ci --omit=dev

# Set environment variable
ENV PORT=3000

# Run as non-root user
USER node

# Start the app
CMD ["npm", "start"]

# Use Node.js image
FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy and install dependencies with pnpm
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install

# Copy application files
COPY tests ./tests

# Expose a port if needed
EXPOSE 3000

# Run tests
CMD ["pnpm", "test"]

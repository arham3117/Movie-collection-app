# =============================================================================
# Stage 1: Builder - Install dependencies and generate Prisma client
# =============================================================================
# Using Node.js 22 Alpine image for a lightweight container
# This image is suitable for running Node.js applications with minimal overhead
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# Using npm ci for a clean install of dependencies based on package-lock.json
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate

# =============================================================================
# Stage 2: Production - Create optimized production image
# =============================================================================
FROM node:22-alpine AS production

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Creating a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package.json and package-lock.json from the builder stage
COPY package*.json ./

# Install only production dependencies
# This ensures that only the necessary dependencies for running the application are installed
RUN npm ci --only=production && \
    npm cache clean --force
# Copy the built application code from the builder stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --chown=nodejs:nodejs . .

# Remove unnecessary files to reduce image size
RUN rm -rf /app/node_modules/.cache && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/*

    
# Change ownership of the app directory to nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs
# Expose the port on which the application will run
EXPOSE 9001

# Start the application
CMD ["npm", "start"]

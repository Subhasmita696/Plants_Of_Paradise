# Node.js Backend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev && npm cache clean --force

# Copy application code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose ports for all services
EXPOSE 3001 3002 3003 3004

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "start"]

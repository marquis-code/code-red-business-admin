# Use Node.js version 18.20.3 based on the appropriate Alpine Linux version
FROM node:18.20.3-alpine3.18 as node-base

# Install git using Alpine's package manager
RUN apk add --no-cache git

# Set environment variables for npm
ENV NPM_CONFIG_PREFIX=/home/node/.npm
ENV PATH=$PATH:/home/node/.npm/bin

# Create necessary directories
RUN mkdir -p "${HOME}/app" \
            "${NPM_CONFIG_PREFIX}/bin"

# Print versions of Node.js, npm, and yarn to confirm the installation
RUN printf "Node version %s, npm version %s, yarn version %s\n\n" \
          "$(node -v)" "$(npm -v)" "$(yarn -v)"

# Set the working directory inside the container
WORKDIR /app

# Copy application files to the container
COPY . .

# Install project dependencies
RUN yarn install

# Build the application
RUN yarn run build

# Expose port 4000 for the application
EXPOSE 4000

# Set the command to start the application
CMD ["yarn", "start"]

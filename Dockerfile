###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine3.16 AS development

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies for canvas
RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    python3 \
    py3-pip

# Set a symbolic link for python3 -> python
RUN ln -s /usr/bin/python3 /usr/bin/python

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the application
RUN npm run build

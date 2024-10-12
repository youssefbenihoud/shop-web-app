# Use the official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the source code into the container
COPY . .

# Expose the port your app runs on (3000)
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]

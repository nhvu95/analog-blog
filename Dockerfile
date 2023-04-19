FROM node:18.13.0
# Create a working directory
RUN mkdir /blog-client
WORKDIR /blog-client
# Copy package.json and package-lock.json files
COPY ./package.json /blog-client/package.json
# Install dependencies
RUN npm install
# Copy source code
COPY . .
RUN npx prisma generate
# Expose ports for both servers
EXPOSE 3000
# Start the first server on port 3000
CMD ["npm", "run", "start:prod"]
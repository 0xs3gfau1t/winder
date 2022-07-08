FROM node:18

WORKDIR /app

# Copy project to workdir
COPY . .

# Install packages
RUN npm install

# Expose client and server ports
EXPOSE 8000

# Run the app
CMD [ "npm", "run", "start" ]
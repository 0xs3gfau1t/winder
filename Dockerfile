FROM node:18

WORKDIR /app

# Copy project to workdir
COPY . .

# Install packages
RUN npm install
RUN npm install pm2 -g

# Expose client and server ports
EXPOSE 3000

# Run the app
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--only", "winder", "--env", "production"]
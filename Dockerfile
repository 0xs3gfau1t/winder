FROM node:18

WORKDIR /app

# Copy project to workdir
COPY . .

# Install packages
RUN npm install

# Compile app for production
RUN npm run build:prod

# Install node process manager
RUN npm install pm2 -g

# Expose server port
EXPOSE 80

# Run the app
# TODO: Use ecosystem.config.js for pm2 instead of spamming flags
CMD [ "pm2-runtime", "start", "server/index.js", "exec_mode", "cluster", "instances", "max"]
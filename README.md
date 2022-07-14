# Winder - Make your life a little more Charmer

## Running the App without Docker
### Install dependencies
    npm install
### Run only server (Development)
    cd <app_dir>/server
    npm run devStart

### Run only client
    cd <app_dir>/client
    npm run serve
### Run both client and server
    cd <app_dir>
    npm run start

## Running app with docker
### Build the image
    cd <app_dir>
    docker build . -t <image_name>
### Run the image
    docker run -p 0.0.0.0:3000:3000 -p 0.0.0.0:8000:8000 -d <image_name>:latest

### Build and run using provided script
    ./run_docker.sh build

### Run using script
    ./run_docker.sh

## Environment variables
### Production 
- SESSION_SECRET
- NODE_ENV

### Required
- PORT
- PAGINATION_LIMIT
- APP_URL
- MAILER_HOST
- MAILER_PORT
- MAILER_ADD
- MAILER_PASS
- ACCESS_TOKEN_SECRET
- MONGO_URI_TEMP
- MONGO_URI
- NODE_ENV

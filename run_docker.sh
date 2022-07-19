#!/usr/bin/sh
RED=$'\e[31m'
GREEN=$'\e[32m'
ENDCOLOR=$'\e[0m'
YELLOW=$'\e[33m'

# variables
img=winder

if ! which docker &> /dev/null;
then
    echo -e "${RED}[X] Docker not installed${ENDCOLOR}"
else
    if [[ $1 == "-h" ]];
    then
        echo "${YELLOW}Usage: ./run_docker.sh [-h:Shows this help, build:builds an image]${ENDCOLOR}"
        exit 1
    elif [[ $1 == "build" ]];
    then
        if docker build . -t $img;
        then
            echo -e "${RED}[X] Docker image build failed${ENDCOLOR}"
            exit
        fi
        echo -e "${GREEN}[+] Build Succeeded${ENDCOLOR}"
    fi
    echo "${YELLOW}Note: run ./run_docker.sh -h for help${ENDCOLOR}"
    docker run -p 0.0.0.0:3000:3000 -d $img:latest
    echo -e "${GREEN}[+] Done${ENDCOLOR}"
fi

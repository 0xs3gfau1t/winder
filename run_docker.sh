#!/usr/bin/sh
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

# variables
img=winder

if ! which docker &> /dev/null;
then
    echo -e "${RED}[X] Docker not installed${ENDCOLOR}"
else
    if [[ $1 == "build" ]];
    then
        if docker build . -t $img;
        then
            echo -e "${RED}[X] Docker image build failed${ENDCOLOR}"
            exit
        fi
        echo -e "${GREEN}[+] Build Succeeded${ENDCOLOR}"
    fi

    docker run -p 0.0.0.0:3000:3000 -p 0.0.0.0:8000:8000 -d $img:latest
    echo -e "${GREEN}[+] Done${ENDCOLOR}"
fi
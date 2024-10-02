FROM node:20-alpine3.16

ARG PAT_TOKEN \
    NEXT_PUBLIC_API_SECRET \
    NEXT_PUBLIC_BACKEND_URL \
    PORT

ENV NEXT_PUBLIC_API_SECRET=${NEXT_PUBLIC_API_SECRET} \
    NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL} \
    PORT=${PORT}

    
RUN mkdir -p /var/app/current

WORKDIR /var/app/current

COPY . .

# CMD ["sleep", "infinity"]
RUN npm ci

RUN npm run build

CMD [ "npm", "run", "start" ]

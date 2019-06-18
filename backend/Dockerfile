FROM node:8-alpine

ENV PORT 8082

EXPOSE 8082

RUN mkdir -p /usr/bin/backend
WORKDIR /usr/bin/backend

COPY package.json /usr/bin/backend/
COPY src /usr/bin/backend/

VOLUME /usr/bin/backend/src/

RUN yarn

CMD ["yarn", "dev"]
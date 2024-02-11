FROM node:20.1.0-alpine as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20.1.0-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:20.1.0-alpine as runner
WORKDIR /app
ENV NODE_ENV production

RUN apk update && apk add --update --no-cache \
    bash \
    curl

COPY --from=builder /app/.env ./env
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
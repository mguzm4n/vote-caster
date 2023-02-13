FROM node:16
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npx tsc
CMD ["node", "./dist/index.js"]
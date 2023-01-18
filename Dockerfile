FROM node:14
WORKDIR /opt/busca-em-tabelas
COPY . .
RUN yarn install

RUN yarn build

EXPOSE 3002
CMD ["yarn", "start"]
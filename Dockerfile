FROM node:14
WORKDIR /opt/busca-em-tabelas
COPY . .
RUN yarn install

RUN yarn build

EXPOSE 3002
CMD ["yarn", "start"]

# Build mais rapido ocupa mais espaço em disco
# FROM node:14 as dependencies
# WORKDIR /busca-em-tabelas
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# FROM node:14 as builder
# WORKDIR /busca-em-tabelas
# COPY . .
# COPY --from=dependencies /busca-em-tabelas/node_modules ./node_modules
# RUN yarn build

# FROM node:14 as runner
# WORKDIR /busca-em-tabelas
# ENV NODE_ENV production
# # If you are using a custom next.config.js file, uncomment this line.
# # COPY --from=builder /busca-em-tabelas/next.config.js ./
# COPY --from=builder /busca-em-tabelas/public ./public
# COPY --from=builder /busca-em-tabelas/.next ./.next
# COPY --from=builder /busca-em-tabelas/node_modules ./node_modules
# COPY --from=builder /busca-em-tabelas/package.json ./package.json
# # COPY --from=builder /busca-em-tabelas/database ./database
# COPY --from=builder /busca-em-tabelas/password.txt ./password.txt

# EXPOSE 3002
# CMD ["yarn", "start"]
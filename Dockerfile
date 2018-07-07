FROM node:8

WORKDIR /usr/src/reservationapp

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]

# # Set proxy server, replace host:port with values for your servers
# ENV http_proxy 127.0.0.1:5432
# ENV https_proxy 127.0.0.1:5432
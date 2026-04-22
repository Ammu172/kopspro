FROM node:18

WORKDIR /app

COPY . /app

RUN ls -l   # 👈 DEBUG (you will see files)

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]

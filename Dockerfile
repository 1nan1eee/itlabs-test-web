FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY db.json ./
RUN npm install -g json-server
RUN npm install -g serve  # Устанавливаем serve глобально
EXPOSE 5173 3000
CMD ["sh", "-c", "json-server --watch db.json --port 3000 & serve -s dist -l 5173"]

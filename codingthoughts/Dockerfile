# Step 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

RUN npm run build

# Step 2: Run the app
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]
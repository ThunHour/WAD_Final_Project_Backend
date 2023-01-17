# SSH- Wad Final project

## Getting started - Development

Create .env file and copy this in

```
PORT=3000
ACCESS_TOKEN_SECRET='twcibNhzcHgrqWaGsBY5eA=='
REFRESH_TOKEN_SECRET='aklsdjalskdjlahjwediouwhaodijasd=='
DATABASE_URL_PRISMA="postgresql://wadfinal:123@localhost:5433/wadfinal?schema=public&sslmode=prefer"

```

Or you can look it up in sample.env

To get start we need to run our postgresql container in docker

```
docker-compose -f .\docker-compose.yml up -d
```

## Migration - Prisma

Most of our command already scripted in package.json you just run the following command

```
pnpm migrate
```

And to run prisma studio for GUI

```
pnpm prisma-studio
or
npx prisma studio
```

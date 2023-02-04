FROM node:16

COPY ./ ./
RUN npm install -g pnpm
RUN pnpm install
ENV PORT=4000
ENV ACCESS_TOKEN_SECRET='twcibNhzcHgrqWaGsBY5eA=='
ENV REFRESH_TOKEN_SECRET='aklsdjalskdjlahjwediouwhaodijasd=='
ENV DATABASE_URL_PRISMA="postgresql://wadfinal:123@localhost:5433/wadfinal?schema=public&sslmode=prefer"
ENV API_KEY="AIzaSyDS_OdpXlRGvLCpGn9Aaa19gtjCe4YOH60"
ENV AUTH_DOMAIN="wad-final-image-storage.firebaseapp.com"
ENV DATABASE_URL="gs://wad-final-image-storage.appspot.com"
ENV PROJECT_ID: "wad-final-image-storage"
ENV STORAGE_BUCKET: 'wad-final-image-storage.appspot.com'
ENV MESSAGING_SENDER_ID: "590557288614"
ENV APP_ID: "1:590557288614:web:bfed3d7de2d63e8ab93c67"
ENV measurementId: "G-Y60VRVVNL9"
CMD ["pnpm", "start"]
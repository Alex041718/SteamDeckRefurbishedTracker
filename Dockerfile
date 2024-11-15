
FROM node:18

# Installation des dépendances pour Puppeteer
RUN apt-get update \
    && apt-get install -y chromium \
        fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
        --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY package*.json ./
COPY script.js ./
COPY .env ./

# Installer les dépendances
RUN npm install

# Configuration de Puppeteer pour utiliser Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Lancer l'application
CMD ["node", "script.js"]
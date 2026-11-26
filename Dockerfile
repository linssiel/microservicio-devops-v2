# syntax=docker/dockerfile:1

# ---------- Etapa 1: dependencias de producción ----------
FROM node:26-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Instalación reproducible y solo con dependencias de producción
RUN npm ci --omit=dev && npm cache clean --force

# ---------- Etapa 2: imagen final ----------
FROM node:26-alpine AS runtime

# Trazabilidad: el commit que originó la imagen queda dentro del contenedor
ARG GIT_SHA=local
ENV NODE_ENV=production \
    PORT=3000 \
    APP_VERSION=${GIT_SHA}

WORKDIR /app
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node src ./src

# Seguridad: no ejecutar como root
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "src/server.js"]

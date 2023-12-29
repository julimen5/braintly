# Usa una imagen de Node como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Compila la aplicación React para producción
RUN npm run build

# Establece el comando de inicio para servir la aplicación React
CMD ["npm", "run", "start"]

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

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará dentro del contenedor
EXPOSE 5000

# Comando para iniciar la aplicación cuando el contenedor se inicie
CMD ["npm", "run", "start:prod"]

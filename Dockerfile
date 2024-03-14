# Imagem oficial do node como base
FROM node:18

# Diretório de trabalho
WORKDIR /usr

# Copiar os arquivos package
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar demais arquivos do projeto
COPY . .

# Expor uma porta do container
EXPOSE 3000

# Comando para inicializar a aplicação
CMD [ "node", "./index.js" ]
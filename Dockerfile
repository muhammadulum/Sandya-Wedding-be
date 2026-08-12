# Menggunakan base image Node.js versi LTS berbasis Alpine Linux yang sangat ringan
FROM node:20-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin file package.json dan package-lock.json terlebih dahulu
# Ini adalah trik DevOps agar proses instalasi NPM bisa di-cache oleh Docker
COPY package*.json ./

# Menginstal dependencies
RUN npm install

# Menyalin seluruh source code backend ke dalam container
COPY . .

# Mengekspos port yang digunakan oleh aplikasi Node.js Anda (sesuai docker-compose port 5000)
EXPOSE 5000

# Perintah untuk menjalankan aplikasi (sesuaikan jika script Anda bukan 'npm start')
CMD ["npm", "start"]
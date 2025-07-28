# Menggunakan image dasar Node.js versi 20
FROM node:20

# Menentukan direktori kerja di dalam container
WORKDIR /src

# Menyalin file package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi yang diperlukan
RUN npm install

# Menyalin semua file aplikasi ke dalam direktori kerja
COPY . .

ARG NEXT_PUBLIC_ENV_BACKEND_URL
ARG ACCESS_TOKEN

# Mengatur variabel lingkungan dengan mendukung override dari environment
ENV NEXT_PUBLIC_ENV_BACKEND_URL=${NEXT_PUBLIC_ENV_BACKEND_URL}
ENV VITE_STORAGE_URL=${VITE_STORAGE_URL}

# Build aplikasi setelah environment variables di-set
RUN npm run build

# Menentukan port yang akan diexpose menggunakan variabel PORT
EXPOSE 5001

# Menjalankan aplikasi
CMD ["npm", "start"]
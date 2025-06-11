import axios from 'axios';
import { API_ENDPOINTS } from './app';
import { jwtDecode } from 'jwt-decode';
// import { IUserProfile } from 'src/sections/_global/hooks/useProfile';
// import { showSnackbar } from 'src/sections/_global/helper/show-snackbar';
export interface IUserProfile {
  email: string;      // Email pengguna
  exp: number;        // Waktu kadaluarsa token (dalam timestamp)
  full_name: string;  // Nama lengkap pengguna
  iat: number;        // Waktu token diterbitkan (dalam timestamp)
  id: number;         // ID unik pengguna
  role: string;       // Peran pengguna (misalnya: "Siswa", "Admin", dll.)
  role_id: number;    // ID unik peran pengguna
  is_admin: boolean;  // Apakah pengguna adalah admin
  school: {
      name: string
      id?: number
  }     // Nama sekolah pengguna\
  request_going: number
  points?: number
  rank?: string
}

export const axiosWithBearer = axios.create();

axiosWithBearer.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken: IUserProfile = jwtDecode(token);

      // Hitung waktu saat ini
      const currentDate = Date.now();

      // Periksa apakah token sudah kedaluwarsa
      if (decodedToken?.exp * 1000 < currentDate) {
        try {
          // Panggil API untuk refresh token
          const response = await axios.get(`${API_ENDPOINTS.user}/token`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Simpan token baru ke localStorage
          const newToken = response?.data?.token;
          localStorage.setItem('token', newToken);

          // Tambahkan token baru ke header Authorization
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          // Jika gagal refresh token, arahkan ke halaman login
          localStorage.removeItem('token');
          window.location.href = '/';
          return Promise.reject(error);
        }
      } else {
        // Tambahkan token lama ke header Authorization
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosWithBearer.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('accessToken');
      window.location.href = '/';
      // showSnackbar('Sesi anda telah habis', 'error');
    }
    return Promise.reject(error);
  }
);

import axios from 'axios';

const API_URL = 'https://xammax.pythonanywhere.com/api/';  // URL до вашого бекенду на Django з префіксом /api/

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Middleware для додавання токену авторизації
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');  // Використовуємо access токен
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Middleware для обробки відповідей, включаючи автоматичне оновлення access токену
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Якщо отримуємо помилку 401 і це не запит на оновлення токену
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Отримуємо refresh токен
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}token/refresh/`, {
            refresh: refreshToken
          });

          // Зберігаємо новий access токен
          localStorage.setItem('accessToken', data.access);

          // Оновлюємо заголовок Authorization і повторюємо оригінальний запит
          originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
          return apiClient(originalRequest);
        } catch (err) {
          console.error('Refresh token failed', err);
          // Тут можна додати логіку виходу з системи або очищення токенів
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

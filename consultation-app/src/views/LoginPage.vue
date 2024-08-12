<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import apiClient from '@/services/api';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''  // Додаємо поле для повідомлень про помилки
    };
  },
  methods: {
  async login() {
    try {
      console.log('Sending login request with:', {
        email: this.email,
        password: this.password
      });
      
      const response = await apiClient.post('login/', {
        email: this.email,
        password: this.password
      });
      
      console.log('Login successful:', response.data);

      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      this.$router.push('/dashboard/');
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.status === 401) {
        this.errorMessage = 'Invalid email or password.';
      } else {
        this.errorMessage = 'An error occurred during login. Please try again.';
      }
    }
  }
}

};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #368a6d;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>

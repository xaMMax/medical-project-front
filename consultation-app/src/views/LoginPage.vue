<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '@/services/api';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await apiClient.post('login/', {
            email: this.email,
            password: this.password
          });
          
          // Зберігаємо обидва токени
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);

          // Перенаправляємо на сторінку профілю
          this.$router.push('/profile/');
        } catch (error) {
          console.error('Login failed', error);
        }
  }
}
  };
  </script>
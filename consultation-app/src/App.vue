<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link v-if="!isAuthenticated" to="/login">Login</router-link> |
        <router-link v-if="!isAuthenticated" to="/register">Register</router-link> |
        <router-link v-if="isAuthenticated" to="/profile">Profile</router-link> |
        <router-link v-if="isAuthenticated" to="/dashboard">Dashboard</router-link> |
        <button v-if="isAuthenticated" @click="logout">Logout</button>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('accessToken'), 
    };
  },
  methods: {
    logout() {
      // Видаляємо токени з localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Оновлюємо стан автентифікації
      this.isAuthenticated = false;

      // Перенаправляємо користувача на сторінку логіну
      this.$router.push('/login');
    },
    checkAuthStatus() {
      // Оновлюємо стан автентифікації при кожному вході або оновленні токена
      this.isAuthenticated = !!localStorage.getItem('accessToken');
    }
  },
  created() {
    // Перевірка автентифікації при створенні компонента
    this.checkAuthStatus();
    // Додаємо глобальний хук перед кожним переходом
    this.$router.beforeEach((to, from, next) => {
      this.checkAuthStatus();
      next();
    });
  }
};
</script>

<style>
/* Ваші стилі залишаються без змін */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header nav {
  margin-bottom: 20px;
}

header nav a {
  font-size: 1.25rem;
  color: #42b983;
  text-decoration: none;
  margin: 0 15px;
}

header nav a:hover {
  text-decoration: underline;
}

button {
  font-size: 1.25rem;
  color: #f44336;
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 15px;
}

button:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}

.profile-photo {
  display: flex;
  flex-direction: column; 
  align-items: center;
  gap: 10px; 
}
</style>

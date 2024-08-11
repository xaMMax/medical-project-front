<template>
    <div class="home">
      <h1>Welcome to Consultation App</h1>
      <p>This is the home page of our application.</p>
      <div>
        <router-link to="/login">Login</router-link> | 
        <router-link to="/register">Register</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        message: 'Welcome to Consultation App',
      };
    },
  };
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }
  
  router-link {
    font-size: 1.25rem;
    color: #42b983;
    text-decoration: none;
  }
  
  router-link:hover {
    text-decoration: underline;
  }
  </style>
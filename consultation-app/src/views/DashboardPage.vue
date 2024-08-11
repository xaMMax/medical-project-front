<template>
    <div class="dashboard-container">
      <h1>Dashboard {{ username }}</h1>
      <UserList />
    </div>
  </template>
  
  <script>
  import UserList from '@/components/UserList.vue';
  import apiClient from '@/services/api';

  export default {
    name: 'DashboardPage',
      components: {
    UserList, // Додаємо компонент UserList
  },
    data() {
      return {
        username: '',
      };
    },
    async created() {
      try {
        const response = await apiClient.get('profile/');
        this.username = response.data.username;
      } catch (error) {
        console.error('Failed to load user profile', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  h1 {
    color: #2c3e50;
    text-align: center;
  }
  </style>
  
<template>
  <div class="user-page-container">
    <h1>{{ user.username }}'s Profile</h1>
    <div class="profile-section">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>First Name:</strong> {{ user.first_name }}</p>
      <p><strong>Last Name:</strong> {{ user.last_name }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Address:</strong> {{ user.address }}</p>
      <p><strong>Bio:</strong> {{ user.bio }}</p>
      <p><strong>Groups:</strong>
        <ul>
          <li v-for="group in user.groups" :key="group">{{ group }}</li>
        </ul>
      </p>
      <p><strong>Permissions:</strong>
        <ul>
          <li v-for="permission in user.user_permissions" :key="permission">{{ permission }}</li>
        </ul>
      </p>
      <div v-if="user.photo">
        <p><strong>Profile Photo:</strong></p>
        <img :src="user.photo" alt="Profile Photo" class="profile-photo"/>
      </div>
    </div>
    <button @click="openUpdateForm">Edit Profile</button>
    <UserUpdate v-if="showUpdateForm" :user="user" @close="closeUpdateForm" />
  </div>
</template>

<script>
import apiClient from '@/services/api';
import UserUpdate from '@/components/UserUpdate.vue';

export default {
  name: 'UserPage',
  components: {
    UserUpdate,
  },
  data() {
    return {
      user: {},
      showUpdateForm: false,
    };
  },
  async created() {
    try {
      const response = await apiClient.get('/profile/');
      this.user = response.data;
    } catch (error) {
      console.error('Failed to load user profile', error);
    }
  },
  methods: {
    openUpdateForm() {
      this.showUpdateForm = true;
    },
    closeUpdateForm(updatedUser) {
      this.showUpdateForm = false;
      if (updatedUser) {
        this.user = updatedUser; // Оновлюємо дані користувача після успішного збереження
      }
    },
  },
};
</script>

<style scoped>
.user-page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.profile-section {
  margin-bottom: 20px;
}

.profile-photo {
  max-width: 150px;
  border-radius: 50%;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #368a6d;
}
</style>

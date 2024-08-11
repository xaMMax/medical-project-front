<template>
  <div class="profile-container">
    <h1>Profile</h1>
    <div class="profile-content">
      <!-- Фото -->
      <div class="profile-photo">
        <img :src="profile.photo" alt="Profile Photo" />
        <input type="file" ref="photoInput" @change="onPhotoChange" style="display: none;" />
        <button @click="triggerPhotoUpload">Change Photo</button>
      </div>
      
      <!-- Дані -->
      <div class="profile-data">
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Username:</strong> {{ profile.username }}</p>
        <div>
          <label for="first_name">First name:</label>
          <input v-model="profile.first_name" id="first_name" type="text" :disabled="!isEditing" />
        </div>
        <div>
          <label for="last_name">Last name:</label>
          <input v-model="profile.last_name" id="last_name" type="text" :disabled="!isEditing" />
        </div>
        <div>
          <label for="phone">Phone:</label>
          <input v-model="profile.phone" id="phone" type="text" :disabled="!isEditing" />
        </div>
        <div>
          <label for="address">Address:</label>
          <input v-model="profile.address" id="address" type="text" :disabled="!isEditing" />
        </div>
        <div>
          <label for="bio">Bio:</label>
          <textarea v-model="profile.bio" id="bio" :disabled="!isEditing"></textarea>
        </div>
      </div>
      
      <!-- Кнопка збереження або редагування -->
      <div class="profile-actions">
        <button v-if="!isEditing" @click="toggleEdit">Change Data</button>
        <button v-else @click="saveProfile">Save Changes</button>
        <button v-if="isEditing" @click="cancelEdit" class="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/services/api';

export default {
  data() {
    return {
      profile: {},
      isEditing: false,
      originalProfile: {},
      newPhotoFile: null, // Змінна для зберігання нового фото
    };
  },
  async created() {
    try {
      const response = await apiClient.get('/profile/');
      this.profile = response.data;
      this.originalProfile = { ...response.data };
    } catch (error) {
      console.error('Failed to load profile', error);
    }
  },
  methods: {
    toggleEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.profile = { ...this.originalProfile };
      this.newPhotoFile = null; // Скидаємо збережене фото при скасуванні редагування
    },
    async saveProfile() {
      try {
        const formData = new FormData();
        formData.append('username', this.profile.username);
        formData.append('email', this.profile.email);
        formData.append('first_name', this.profile.first_name);
        formData.append('last_name', this.profile.last_name);
        formData.append('phone', this.profile.phone);
        formData.append('address', this.profile.address);
        formData.append('bio', this.profile.bio);

        if (this.newPhotoFile) {
          formData.append('photo', this.newPhotoFile);
        }

        await apiClient.put('/profile/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.isEditing = false;
        this.originalProfile = { ...this.profile };
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Failed to update profile', error);
        alert('Failed to update profile. Please try again.');
      }
    },
    triggerPhotoUpload() {
      this.$refs.photoInput.click();
    },
    onPhotoChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newPhotoFile = file; // Зберігаємо нове фото
        this.profile.photo = URL.createObjectURL(file); // Оновлюємо прев'ю фото
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.profile-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.profile-photo img {
  max-width: 150px;
  border-radius: 50%;
  object-fit: contain;
}

.profile-data {
  flex: 1;
}

.profile-data p, 
.profile-data div {
  margin-bottom: 10px;
}

.profile-data label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.profile-data input, 
.profile-data textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.profile-data input:disabled, 
.profile-data textarea:disabled {
  background-color: #f0f0f0;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.profile-actions button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.profile-actions button:hover {
  background-color: #368a6d;
}

.profile-actions button.cancel {
  background-color: #f44336;
}

.profile-actions button.cancel:hover {
  background-color: #d32f2f;
}
</style>

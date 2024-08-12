<template>
    <div class="modal">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="username">Username:</label>
            <input v-model="localUser.username" id="username" type="text" disabled />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="localUser.email" id="email" type="email" />
          </div>
          <div class="form-group">
            <label for="first_name">First Name:</label>
            <input v-model="localUser.first_name" id="first_name" type="text" />
          </div>
          <div class="form-group">
            <label for="last_name">Last Name:</label>
            <input v-model="localUser.last_name" id="last_name" type="text" />
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input v-model="localUser.phone" id="phone" type="text" />
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input v-model="localUser.address" id="address" type="text" />
          </div>
          <div class="form-group">
            <label for="bio">Bio:</label>
            <textarea v-model="localUser.bio" id="bio"></textarea>
          </div>
          <div class="form-group">
            <label for="photo">Profile Photo:</label>
            <input type="file" @change="onPhotoChange" id="photo" />
            <img :src="photoPreview" alt="Profile Photo" v-if="photoPreview" class="profile-photo-preview"/>
          </div>
          <div class="button-group">
            <button type="submit" class="btn-save">Save Changes</button>
            <button type="button" class="btn-cancel" @click="closeForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/services/api';
  
  export default {
    name: 'UserUpdate',
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        localUser: { ...this.user }, // Створюємо копію об'єкта user
        photoPreview: this.user.photo,
        newPhotoFile: null,
      };
    },
    methods: {
      onPhotoChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.newPhotoFile = file;
          this.photoPreview = URL.createObjectURL(file);
        }
      },
      async updateProfile() {
        try {
          const formData = new FormData();
          formData.append('username', this.localUser.username);
          formData.append('email', this.localUser.email);
          formData.append('first_name', this.localUser.first_name);
          formData.append('last_name', this.localUser.last_name);
          formData.append('phone', this.localUser.phone);
          formData.append('address', this.localUser.address);
          formData.append('bio', this.localUser.bio);
  
          if (this.newPhotoFile) {
            formData.append('photo', this.newPhotoFile);
          }
  
          const response = await apiClient.put('/profile/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          this.$emit('close', response.data); // Повертаємо оновлені дані користувача
          alert('Profile updated successfully!');
        } catch (error) {
          console.error('Failed to update profile', error);
          alert('Failed to update profile. Please try again.');
        }
      },
      closeForm() {
        this.$emit('close'); // Закриваємо форму без збереження
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: slide-down 0.3s ease-out;
  }
  
  @keyframes slide-down {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group textarea {
    resize: vertical;
    height: 80px;
  }
  
  .profile-photo-preview {
    display: block;
    margin-top: 10px;
    max-width: 150px;
    border-radius: 50%;
    border: 2px solid #ddd;
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .btn-save {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .btn-save:hover {
    background-color: #368a6d;
  }
  
  .btn-cancel {
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-cancel:hover {
    background-color: #d32f2f;
  }
  </style>
  
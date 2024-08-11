<template>
  <div class="user-form">
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input v-model="localForm.username" type="text" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="localForm.email" type="email" id="email" required />
      </div>
      <div v-if="showPasswordField">
        <label for="password">Password:</label>
        <input v-model="localForm.password" type="password" id="password" required />
      </div>
      <div v-if="showPasswordField">
        <label for="confirm_password">Confirm Password:</label>
        <input v-model="localForm.confirm_password" type="password" id="confirm_password" required />
      </div>
      <button type="submit">{{ submitButtonText }}</button>
    </form>
  </div>
</template>

<script>
import apiClient from '@/services/api';

export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    showExtraFields: {
      type: Boolean,
      default: true
    },
    submitButtonText: {
      type: String,
      default: 'Submit'
    }
  },
  data() {
    return {
      localForm: { ...this.form }  // створюємо локальну копію форми, щоб уникнути мутацій пропсів
    };
  },
  computed: {
    showPasswordField() {
      return this.showExtraFields;
    }
  },
  methods: {
    toggleEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.users = { ...this.originalUsers };
    },
    async saveProfile() {
      try {
        const updatedUsers = { ...this.users };
        delete updatedUsers.photo; 

        const response = await apiClient.put('users/', updatedUsers, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Profile updated successfully', response.data.first_name);
        this.isEditing = false;
        this.originalUsers = { ...this.users };
      } catch (error) {
        console.error('Failed to update profile', error);
        console.error('Error response:', error.response);
      }
    },
    triggerPhotoUpload() {
      this.$refs.photoInput.click();
    },
    async onPhotoChange(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('email', this.users.email);  
        formData.append('username', this.users.username);

        try {
          const response = await apiClient.put('users/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          this.Users.photo = response.data.photo;
        } catch (error) {
          console.error('Failed to update photo', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.user-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.user-form label {
  display: block;
  margin-bottom: 5px;
}

.user-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-form button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.user-form button:hover {
  background-color: #368a6d;
}
</style>

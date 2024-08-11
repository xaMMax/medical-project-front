<template>
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Bio</th>
            <th>Photo</th>
            <th>Doctor</th>
            <th>User</th>
            <th>Groups</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.bio }}</td>
            <td><img :src="user.photo" alt="User Photo" class="user-photo" /></td>
            <td>{{ user.is_doctor ? 'Yes' : 'No' }}</td>
            <td>{{ user.is_user ? 'Yes' : 'No' }}</td>
            <td>
              <ul>
                <li v-for="group in user.groups" :key="group">{{ group }}</li>
              </ul>
            </td>
            <td>
              <button @click="editUser(user)">Edit</button>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Модальне вікно редагування -->
      <div v-if="showEditModal" class="modal">
        <div class="modal-content">
          <h3>Edit User</h3>
          <label for="edit-username">Username:</label>
          <input v-model="editedUser.username" id="edit-username" type="text" />
  
          <label for="edit-email">Email:</label>
          <input v-model="editedUser.email" id="edit-email" type="email" />
  
          <label for="edit-groups">Groups:</label>
          <input v-model="editedUser.groups" id="edit-groups" type="text" placeholder="Enter comma-separated groups" />
  
          <label for="edit-is-doctor">Is Doctor:</label>
          <input v-model="editedUser.is_doctor" id="edit-is-doctor" type="checkbox" />
  
          <label for="edit-is-user">Is User:</label>
          <input v-model="editedUser.is_user" id="edit-is-user" type="checkbox" />
  
          <label for="edit-photo">Update Photo:</label>
          <input type="file" @change="onPhotoChange" />
  
          <div class="modal-buttons">
            <button @click="saveEditedUser">Save</button>
            <button @click="closeEditModal" class="cancel-button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/services/api';
  
  export default {
    data() {
      return {
        users: [],
        showEditModal: false,
        editedUser: {},
        newPhotoFile: null,  // Змінна для зберігання нового фото
      };
    },
    async created() {
      await this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await apiClient.get('/users/');
          this.users = response.data;
        } catch (error) {
          console.error('Failed to load users', error);
        }
      },
      editUser(user) {
        this.editedUser = { ...user };
        this.showEditModal = true;
      },
      async saveEditedUser() {
        try {
          if (!this.editedUser.id) {
            console.error('No user ID found');
            return;
          }
  
          const formData = new FormData();
          formData.append('username', this.editedUser.username);
          formData.append('email', this.editedUser.email);
          formData.append('first_name', this.editedUser.first_name);
          formData.append('last_name', this.editedUser.last_name);
          formData.append('phone', this.editedUser.phone);
          formData.append('address', this.editedUser.address);
          formData.append('bio', this.editedUser.bio);
          formData.append('is_doctor', this.editedUser.is_doctor);
          formData.append('is_user', this.editedUser.is_user);
          formData.append('groups', this.editedUser.groups.join(','));
  
          if (this.newPhotoFile) {
            formData.append('photo', this.newPhotoFile);
          }
  
          const response = await apiClient.put(`/users/${this.editedUser.id}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log('User updated:', response.data);
          alert('User updated successfully!');
          this.closeEditModal();
          await this.fetchUsers();
        } catch (error) {
          console.error('Failed to update user', error.response ? error.response.data : error.message);
        }
      },
      onPhotoChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.newPhotoFile = file;  // Зберігаємо нове фото
        }
      },
      closeEditModal() {
        this.showEditModal = false;
        this.newPhotoFile = null;  // Скидаємо збережене фото
      },
      async deleteUser(userId) {
        try {
          const confirmed = confirm('Are you sure you want to delete this user?');
          if (confirmed) {
            await apiClient.delete(`/users/${userId}/`);
            this.users = this.users.filter(user => user.id !== userId);
            alert('User deleted successfully!');
          }
        } catch (error) {
          console.error('Failed to delete user', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .user-photo {
    max-width: 50px;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 12px;
    margin-right: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #368a6d;
  }
  
  .cancel-button {
    background-color: #f44336;
  }
  
  .cancel-button:hover {
    background-color: #d32f2f;
  }
  
  /* Стилі для модального вікна */
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
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .modal-content h3 {
    margin-bottom: 15px;
  }
  
  .modal-content label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .modal-content input[type="text"],
  .modal-content input[type="email"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>
  
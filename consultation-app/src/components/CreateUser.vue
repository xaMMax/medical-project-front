<template>
    <div>
      <button @click="openCreateForm">Create New User</button>
  
      <div v-if="showFormModal" class="modal">
        <div class="modal-content">
          <h3>Create User</h3>
          <UserForm
            :form="newUser"
            submit-button-text="Create User"
            @submit="createUser"
          />
          <button @click="closeFormModal" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UserForm from '@/components/UserForm.vue';
  import apiClient from '@/services/api';
  
  export default {
    components: {
      UserForm,
    },
    data() {
      return {
        showFormModal: false,
        newUser: {
          username: '',
          email: '',
          first_name: '',
          last_name: '',
          phone: '',
          address: '',
          bio: '',
          photo: null,
          is_doctor: false,
          is_user: true,
          groups: [],
        },
      };
    },
    methods: {
      openCreateForm() {
        this.showFormModal = true;
      },
      closeFormModal() {
        this.showFormModal = false;
      },
      async createUser(formData) {
        try {
          const response = await apiClient.post('/users/', formData);
          console.log('User created:', response.data);
          this.showFormModal = false;
          this.$emit('userCreated'); // Викликаємо подію для оновлення списку користувачів
        } catch (error) {
          console.error('Failed to create user', error.response ? error.response.data : error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    padding: 8px 12px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #368a6d;
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
  
  .cancel-button {
    background-color: #f44336;
    margin-top: 10px;
  }
  
  .cancel-button:hover {
    background-color: #d32f2f;
  }
  </style>
  
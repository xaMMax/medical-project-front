<template>
  <div class="register">
    <h1>Register</h1>
    <user-form
      :form="form"
      :show-extra-fields="true"
      submit-button-text="Register"
      @submit="register"
    />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import apiClient from '@/services/api';

export default {
  name: 'UserRegister',
  components: {
    UserForm,
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirm_password: '',
      },
      error: null,
      isSubmitting: false, // Додаємо прапорець для запобігання повторних викликів
    };
  },
  methods: {
    async register(userForm) {
      if (this.isSubmitting) return; // Якщо вже йде відправка, виходимо
      this.isSubmitting = true;

      if (this.error) {
        this.error = null; // Очищення попередньої помилки перед новим запитом
      }

      // Перевірка відповідності паролів
      if (userForm.password !== userForm.confirm_password) {
        this.error = 'Passwords do not match';
        this.isSubmitting = false; // Знімаємо прапорець
        return;
      }

      // Підготовка даних для відправки
      const payload = {
        username: userForm.username,
        email: userForm.email,
        password: userForm.password,
      };

      console.log('Payload being sent:', payload); 

      try {
        const response = await apiClient.post('register/', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Registration successful:', response.data);
        this.$router.push('login/'); 
      } catch (error) {
        if (error.response && error.response.data) {
          console.log('Error details:', error.response.data); 
          this.error = error.response.data;
        } else {
          this.error = 'Registration failed. Please try again.';
        }
      } finally {
        this.isSubmitting = false; // Знімаємо прапорець після завершення
      }
    },
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.register h1 {
  margin-bottom: 20px;
}

.register p {
  color: red;
}
</style>

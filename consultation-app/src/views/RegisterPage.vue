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
        is_doctor: false,
        phone: '',
        address: '',
        bio: '',
        photo: null,
      },
      error: null,
    };
  },
  methods: {
    async register(userForm) {
      // Перевірка, чи паролі співпадають
      if (userForm.password !== userForm.confirm_password) {
        this.error = 'Passwords do not match';
        return;
      }

      const formData = new FormData();
      formData.append('username', userForm.username);
      formData.append('email', userForm.email);
      formData.append('password', userForm.password);
      formData.append('is_doctor', userForm.is_doctor);
      formData.append('phone', userForm.phone);
      formData.append('address', userForm.address);
      formData.append('bio', userForm.bio);
      if (userForm.photo) {
        formData.append('photo', userForm.photo);
      }

      try {
        const response = await apiClient.post('register/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Використання response для логів або іншої логіки
        console.log('Registration successful:', response.data);

        this.$router.push('login/'); // Перенаправлення на сторінку логіну після успішної реєстрації
      } catch (error) {
        this.error = 'Registration failed. Please try again.';
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

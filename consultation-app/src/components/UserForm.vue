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
    localForm: JSON.parse(JSON.stringify(this.form)) 
  };
  },  
  computed: {
    showPasswordField() {
      return this.showExtraFields;
    }
  },
  methods: {
    handleSubmit() {
      console.log('Submitting form data:', this.localForm); 
      this.$emit('submit', this.localForm);
    },
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

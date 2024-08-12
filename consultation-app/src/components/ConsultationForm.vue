<template>
    <div class="consultation-form">
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="doctor">Doctor:</label>
          <input v-model="localConsultation.doctor" id="doctor" type="text" />
        </div>
        <div>
          <label for="patient">Patient:</label>
          <input v-model="localConsultation.patient" id="patient" type="text" />
        </div>
        <div>
          <label for="date">Date:</label>
          <input v-model="localConsultation.date" id="date" type="date" />
        </div>
        <div>
          <label for="time">Time:</label>
          <input v-model="localConsultation.time" id="time" type="time" />
        </div>
        <div>
          <label for="notes">Notes:</label>
          <textarea v-model="localConsultation.notes" id="notes"></textarea>
        </div>
        <button type="submit">{{ submitButtonText }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      consultation: {
        type: Object,
        required: true,
      },
      submitButtonText: {
        type: String,
        default: 'Save',
      },
    },
    data() {
      return {
        localConsultation: { ...this.consultation }, // Локальна копія пропса
      };
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', this.localConsultation);
      },
    },
  };
  </script>
  
  <style scoped>
  .consultation-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .consultation-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .consultation-form input,
  .consultation-form textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .consultation-form button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .consultation-form button:hover {
    background-color: #368a6d;
  }
  </style>
  
<template>
    <div>
      <h2>All Consultations</h2>
      <button @click="openCreateForm">Create New Consultation</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="consultation in consultations" :key="consultation.id">
            <td>{{ consultation.id }}</td>
            <td>{{ consultation.doctor }}</td>
            <td>{{ consultation.patient }}</td>
            <td>{{ consultation.date }}</td>
            <td>{{ consultation.time }}</td>
            <td>{{ consultation.notes }}</td>
            <td>
              <button @click="editConsultation(consultation)">Edit</button>
              <button @click="deleteConsultation(consultation.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Модальне вікно редагування або створення -->
      <div v-if="showFormModal" class="modal">
        <div class="modal-content">
          <h3>{{ isEditing ? 'Edit Consultation' : 'Create Consultation' }}</h3>
          <ConsultationForm
            :consultation="currentConsultation"
            :submitButtonText="isEditing ? 'Save Changes' : 'Create Consultation'"
            @submit="handleFormSubmit"
          />
          <button @click="closeFormModal" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ConsultationForm from '@/components/ConsultationForm.vue';
  import apiClient from '@/services/api';
  
  export default {
    components: {
      ConsultationForm,
    },
    data() {
      return {
        consultations: [],
        showFormModal: false,
        currentConsultation: {},
        isEditing: false,
      };
    },
    async created() {
      await this.fetchConsultations();
    },
    methods: {
      async fetchConsultations() {
        try {
          const response = await apiClient.get('/consultations/');
          this.consultations = response.data;
        } catch (error) {
          console.error('Failed to load consultations', error);
        }
      },
      openCreateForm() {
        this.currentConsultation = {
          doctor: '',
          patient: '',
          date: '',
          time: '',
          notes: '',
        };
        this.isEditing = false;
        this.showFormModal = true;
      },
      editConsultation(consultation) {
        this.currentConsultation = { ...consultation };
        this.isEditing = true;
        this.showFormModal = true;
      },
      async handleFormSubmit(consultation) {
        try {
          if (this.isEditing) {
            await apiClient.put(`/consultations/${consultation.id}/`, consultation);
            alert('Consultation updated successfully!');
          } else {
            await apiClient.post('/consultations/', consultation);
            alert('Consultation created successfully!');
          }
          this.closeFormModal();
          await this.fetchConsultations();
        } catch (error) {
          console.error('Failed to save consultation', error.response ? error.response.data : error.message);
        }
      },
      async deleteConsultation(consultationId) {
        try {
          const confirmed = confirm('Are you sure you want to delete this consultation?');
          if (confirmed) {
            await apiClient.delete(`/consultations/${consultationId}/`);
            this.consultations = this.consultations.filter(c => c.id !== consultationId);
            alert('Consultation deleted successfully!');
          }
        } catch (error) {
          console.error('Failed to delete consultation', error);
        }
      },
      closeFormModal() {
        this.showFormModal = false;
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
  </style>
  
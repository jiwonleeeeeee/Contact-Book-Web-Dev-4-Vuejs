<template>
  <div id="app">
    <h1>Contact Book</h1>
    <div>
      <input v-model="searchQuery" placeholder="Search by name" />
    </div>
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        <span @click="viewContact(contact)">
          {{ contact.firstName }} {{ contact.lastName }}
        </span>
        <button @click="editContact(contact)">Edit</button>
        <button @click="deleteContact(contact)">Delete</button>
      </li>
    </ul>
    <button @click="addContact">Add New Contact</button>
    
    <div v-if="showModal">
      <h2>{{ isEditing ? 'Edit Contact' : 'Add New Contact' }}</h2>
      <form @submit.prevent="saveContact">
        <input v-model="form.firstName" placeholder="First Name" required />
        <input v-model="form.lastName" placeholder="Last Name" required />
        <input v-model="form.email" placeholder="Email" required />
        <button type="submit">{{ isEditing ? 'Save Changes' : 'Add Contact' }}</button>
        <button @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      contacts: [],
      searchQuery: '',
      form: {
        firstName: '',
        lastName: '',
        email: ''
      },
      showModal: false,
      isEditing: false,
      editingContact: null
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
    }
  },
  mounted() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.contacts = JSON.parse(storedContacts);
    } else {
      this.contacts = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com' }
      ];
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
    }
  },
  methods: {
    viewContact(contact) {
      this.$router.push(`/contact/${contact.id}`);
    },
    editContact(contact) {
      this.isEditing = true;
      this.showModal = true;
      this.form = { ...contact };
      this.editingContact = contact;
    },
    deleteContact(contact) {
      if (confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
        this.contacts = this.contacts.filter(c => c.id !== contact.id);
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
      }
    },
    addContact() {
      this.isEditing = false;
      this.form = { firstName: '', lastName: '', email: '' };
      this.showModal = true;
    },
    saveContact() {
      if (this.isEditing) {
        Object.assign(this.editingContact, this.form);
      } else {
        const newContact = {
          id: Date.now(),
          ...this.form
        };
        this.contacts.push(newContact);
      }
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>




<style>
#app {
  font-family: 'Arial', sans-serif;
  background-color: #f4f7fb;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.app-header {
  background-color: #007bff;
  color: white;
  padding: 20px 0;
  text-align: center;
  font-size: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 36px;
  font-weight: bold;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

router-view {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 28px;
  }

  router-view {
    padding: 10px;
  }
}
</style>

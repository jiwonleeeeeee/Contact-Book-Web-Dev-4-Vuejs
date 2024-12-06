<template>
  <div>
    <h2>Edit Contact</h2>
    <form @submit.prevent="saveContact">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="form.firstName" />

      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="form.lastName" />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" />

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { getContacts, saveContacts } from '../utils/storage'

export default {
  props: ['id'],
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: ''
      }
    };
  },
  created() {
    const contacts = getContacts();
    const contact = contacts.find(contact => contact.id === parseInt(this.id));
    if (contact) {
      this.form.firstName = contact.firstName;
      this.form.lastName = contact.lastName;
      this.form.email = contact.email; 
    }
  },
  methods: {
    saveContact() {
      const contacts = getContacts();
      const index = contacts.findIndex(contact => contact.id === parseInt(this.id));
      if (index !== -1) {
        contacts[index] = {
          id: parseInt(this.id),
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email
        };
        saveContacts(contacts); 
        this.$router.push(`/contact/${this.id}`);  
      }
    }
  }
}
</script>

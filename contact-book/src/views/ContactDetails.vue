<template>
  <div v-if="contact">
    <h2>{{ contact.firstName }} {{ contact.lastName }}</h2>
    <p>Email: {{ contact.email }}</p>
    <router-link :to="'/edit/' + contact.id">Edit</router-link>
    <button @click="deleteContact">Delete</button>
  </div>
  <div v-else>
    <p>Contact not found.</p>
  </div>
</template>

<script>
import { getContacts, saveContacts } from '../utils/storage';

export default {
  props: ['id'],  
  data() {
    return {
      contact: null,  
    };
  },
  created() {
  
    console.log(this.id); 

    const contacts = getContacts(); 
    this.contact = contacts.find(contact => contact.id === parseInt(this.id));  
    console.log(this.contact);
  },
  methods: {
    deleteContact() {
      if (confirm(`Are you sure you want to delete ${this.contact.firstName} ${this.contact.lastName}?`)) {
        const contacts = getContacts();
        const updatedContacts = contacts.filter(contact => contact.id !== this.contact.id); 
        saveContacts(updatedContacts);  
        this.$router.push('/');  
      }
    },
  },
};
</script>

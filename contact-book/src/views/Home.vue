<template>
    <div>
      <input v-model="search" placeholder="Search contacts" />
      <ul>
        <li v-for="contact in filteredContacts" :key="contact.id">
          <router-link :to="'/contact/' + contact.id">{{ contact.firstName }} {{ contact.lastName }}</router-link>
        </li>
      </ul>
      <router-link to="/add">Add Contact</router-link>
    </div>
  </template>
  
  <script>
  import { getContacts } from '../utils/storage'
  
  export default {
    data() {
      return {
        contacts: getContacts(),
        search: ''
      }
    },
    computed: {
      filteredContacts() {
        return this.contacts.filter(contact =>
          contact.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(this.search.toLowerCase())
        ).sort((a, b) => a.lastName.localeCompare(b.lastName))
      }
    }
  }
  </script>
  

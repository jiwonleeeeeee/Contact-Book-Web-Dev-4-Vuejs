<template>
    <div>
      <h2>Add New Contact</h2>
      <form @submit.prevent="addContact">
        <input v-model="firstName" placeholder="First Name" required />
        <input v-model="lastName" placeholder="Last Name" required />
        <input v-model="email" placeholder="Email" type="email" required />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  </template>




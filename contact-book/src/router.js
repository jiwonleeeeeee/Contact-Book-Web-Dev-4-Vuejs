import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import ContactDetails from './views/ContactDetails.vue';
import AddContact from './views/AddContact.vue';
import EditContact from './views/EditContact.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/contact/:id', component: ContactDetails, props: true },  
  { path: '/add', component: AddContact },
  { path: '/edit/:id', component: EditContact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

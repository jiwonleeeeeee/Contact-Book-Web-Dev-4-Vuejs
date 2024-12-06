// utils/storage.js

export function getContacts() {
  const contacts = localStorage.getItem('contacts');
  return contacts ? JSON.parse(contacts) : [];
}

export function saveContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

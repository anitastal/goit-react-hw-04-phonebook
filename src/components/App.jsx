import { nanoid } from 'nanoid';
import { useState } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Phonebook } from './Phonebook';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const saveContacts = localStorage.getItem('contacts');
    if (saveContacts) {
      return JSON.parse(saveContacts);
    }
    return [];
  });

  const handleDeleteUser = id => {
    setContacts(contacts => {
      return contacts.filter(item => item.id !== id);
    });
  };

  const onFilterContacts = () => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onChangeName = event => {
    setFilter(event.target.value);
  };

  const handleSubmit = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
    setContacts(prevContacts => {
      return [...prevContacts, { name, number, id: nanoid() }];
    });
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 16,
        color: '#010101',
        gap: 10,
      }}
    >
      <h1>Phonebook</h1>
      <Phonebook handleAddContact={handleSubmit} onChangeName={onChangeName} />
      <h2>Contacts</h2>
      <Filter onChangeName={onChangeName} filter={filter} />
      <ContactList
        onFilterContacts={onFilterContacts()}
        deleteUser={handleDeleteUser}
      />
    </div>
  );
};

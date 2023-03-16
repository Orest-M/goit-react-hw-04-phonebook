import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import AddContacts from './addContact/AddContact';
import Contacts from './contacts/Contacts';
import Filter from './filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('contacts')) {
      const data = localStorage.getItem('contacts');

      setContacts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onFilter = e => {
    setFilter(e.target.value);
    setFilteredArr();
  };

  const setFilteredArr = () => {
    if (filter.length > 0) {
      const newArr = contacts.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );

      return newArr;
    }
  };

  const addItem = (name, number) => {
    const newItem = {
      name,
      number,
      id: nanoid(),
    };

    setContacts(contacts => [...contacts, newItem]);
  };

  const deleteItem = e => {
    if (e.target.dataset.id) {
      contacts.forEach(item => {
        if (item.id === e.target.dataset.id) {
          const index = contacts.indexOf(item);
          const newArr = [...contacts];
          newArr.splice(index, 1);

          setContacts(newArr);
        }
      });
    }
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>Phonebook</h2>
      <AddContacts addItem={addItem} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter onFilter={onFilter} filter={filter} />
      <Contacts
        contacts={contacts}
        setFilteredArr={setFilteredArr}
        onDelete={deleteItem}
      />
    </div>
  );
};

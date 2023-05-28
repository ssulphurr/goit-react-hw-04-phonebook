import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const gotContacts = localStorage.getItem('contacts');
    if (gotContacts) {
      return JSON.parse(gotContacts);
    }
    return [];
  });
  const [filter, setFilter] = useState('');
  const [visibleContacts, setVisibleContact] = useState([]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const match = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLocaleLowerCase() ||
        contact.number === number
    );

    if (match) {
      alert(`${name} or ${number} is already in contacts`);
      return;
    } else {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts([...contacts, contact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const normalizedFilter = filter.toLocaleLowerCase();

    setVisibleContact(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    );
  }, [filter, contacts]);

  return (
    <>
      <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        {visibleContacts && (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        )}
      </Section>
    </>
  );
}

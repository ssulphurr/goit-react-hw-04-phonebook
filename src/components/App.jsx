// import { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useEffect, useState } from 'react';

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

// export class App extends Component {
//   state = {
// contacts: [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ],
//     filter: '',
//   };

//   componentDidMount() {
// const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

// if (parsedContacts) {
//   this.setState({ contacts: parsedContacts });
// }
//   }

//   componentDidUpdate(prevProps, prevState) {
// if (this.state.contacts !== prevState.contacts) {
//   localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
// }
//   }

//   addContact = ({ name, number }) => {
// const match = this.state.contacts.find(
//   contact =>
//     contact.name.toLowerCase() === name.toLocaleLowerCase() ||
//     contact.number === number
// );

// if (match) {
//   alert(`${name} or ${number} is already in contacts`);
//   return;
// } else {
//   const contact = {
//     id: nanoid(),
//     name,
//     number,
//   };

//   this.setState(prevState => ({
//     contacts: [...prevState.contacts, contact],
//   }));
// }
//   };

//   changeFilter = e => {
// this.setState({ filter: e.target.value });
//   };

// deleteContact = contactId => {
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//   }));
// };

//   render() {
// const { contacts, filter } = this.state;

// const normalizedFilter = filter.toLocaleLowerCase();
// const visibleContacts = contacts.filter(contact =>
//   contact.name.toLowerCase().includes(normalizedFilter)
// );

//     return (
// <>
//   <Section title="Phonebook">
//     <Form onSubmit={this.addContact} />
//   </Section>

//   <Section title="Contacts">
//     <Filter value={filter} onChange={this.changeFilter} />
//     <ContactList
//       contacts={visibleContacts}
//       onDeleteContact={this.deleteContact}
//     />
//   </Section>
// </>
//     );
//   }
// }

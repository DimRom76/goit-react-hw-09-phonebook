import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Paper } from '@material-ui/core';

import ContactList from '../Components/ContactList';
import ContactForm from '../Components/ContactForm';
import Mainbar from '../Components/Mainbar';
import Modal from '../Components/Modal';

import { contactsOperation, contactsSelectors } from '../redux/contacts';

function ContactsView({ fetchContacts, isContactsLoading }) {
  const [showModal, setshowModal] = useState(false);
  const [editContact, setEditContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const toggleModal = () => {
    setshowModal(!showModal);
    setEditContact({});
  };

  const currentEditContact = editContact => {
    setshowModal(!showModal);
    setEditContact(editContact);
  };

  return (
    <div className="container">
      {isContactsLoading && (
        <Modal>
          <h1>Обработка данных...</h1>
        </Modal>
      )}

      <Paper className="paper">
        <Mainbar onClick={toggleModal} />

        <h2>Phonebook</h2>

        <ContactList onEditContact={currentEditContact} />
      </Paper>

      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactForm onSave={toggleModal} editContact={editContact} />
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  isContactsLoading: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperation.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);

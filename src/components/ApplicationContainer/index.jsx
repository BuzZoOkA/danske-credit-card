import React, { useReducer, useEffect } from 'react';
import './appContainer.css';
import AddCreditCardForm from '../AddCreditCardForm';
import { useState } from 'react';
import Dashboard from '../Dashboard';

const AppContainer = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const [editCreditCardOpen, setEditCreditCardOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState('');

  return (
    <div className='app-container'>
      {formOpen || editCreditCardOpen ? (
        <AddCreditCardForm
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          editCreditCardOpen={editCreditCardOpen}
          setEditCreditCardOpen={setEditCreditCardOpen}
          deleteCard={deleteCard}
          setDeleteCard={setDeleteCard}
        />
      ) : (
        <Dashboard
          editCreditCardOpen={editCreditCardOpen}
          setEditCreditCardOpen={setEditCreditCardOpen}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          deleteCard={deleteCard}
          setDeleteCard={setDeleteCard}
        />
      )}
    </div>
  );
};

export default AppContainer;

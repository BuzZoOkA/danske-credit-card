import React, { useReducer, useEffect } from 'react';
import './appContainer.css';
import AddCreditCardForm from '../AddCreditCardForm';
import { useState } from 'react';
import Dashboard from '../Dashboard';
import { db } from '../../firebase_config';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
export const GlobalContextDispatch = React.createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DASHBOARD_DATA': {
      return Object.assign({}, state, { creditCardData: action.payload });
    }
    case 'EDIT_CREDIT_CARD_FORM_DATA': {
      return Object.assign({}, state, {
        editCreditCardFormData: action.payload,
      });
    }
    default:
      return state;
  }
};
const creditCardsDataRef = collection(db, 'creditCardsData');

const addCreditCard = async (formData) => {
  await addDoc(creditCardsDataRef, { ...formData });
};

const deleteCreditCard = async (id) => {
  const userDoc = doc(creditCardsDataRef, id);
  await deleteDoc(userDoc);
};

const editCreditCard = async (id, formData) => {
  const userDoc = doc(db, 'creditCardsData', id);
  await updateDoc(userDoc, formData);
};

const AppContainer = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    creditCardData: [],
    editCreditCardFormData: {},
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editCreditCardOpen, setEditCreditCardOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState('');

  useEffect(() => {
    const getCreditCardsData = async () => {
      const data = await getDocs(creditCardsDataRef);
      const creditCardsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({ type: 'LOAD_DASHBOARD_DATA', payload: creditCardsData });
    };
    getCreditCardsData();
  }, [formOpen, editCreditCardOpen, deleteCard]);

  return (
    <GlobalContextDispatch.Provider value={dispatch}>
      <div className='app-container'>
        {formOpen || editCreditCardOpen ? (
          <AddCreditCardForm
            addCreditCard={addCreditCard}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            editCreditCardOpen={editCreditCardOpen}
            setEditCreditCardOpen={setEditCreditCardOpen}
            editCreditCardFormData={state.editCreditCardFormData}
            editCreditCard={editCreditCard}
            setDeleteCard
          />
        ) : (
          <Dashboard
            deleteCreditCard={deleteCreditCard}
            setEditCreditCardOpen={setEditCreditCardOpen}
            setFormOpen={setFormOpen}
            setDeleteCard={setDeleteCard}
            {...state}
          />
        )}
      </div>
    </GlobalContextDispatch.Provider>
  );
};

export default AppContainer;

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

const editCreditCard = async (formData) => {
  const userDoc = doc(creditCardsDataRef, formData.id);
  await updateDoc(creditCardsDataRef, { ...formData });
};

const AppContainer = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    creditCardData: [],
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editCreditCardOpen, setEditCreditCardOpen] = useState(false);

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
  }, [formOpen]);

  console.log('The state of the application is', state);
  return (
    <GlobalContextDispatch.Provider value={dispatch}>
      <div className='app-container'>
        {formOpen || editCreditCardOpen ? (
          <AddCreditCardForm
            setFormOpen={setFormOpen}
            formOpen={formOpen}
            editCreditCardOpen={editCreditCardOpen}
            setEditCreditCardOpen={setEditCreditCardOpen}
            addCreditCard={addCreditCard}
            editCreditCard={editCreditCard}
          />
        ) : (
          <Dashboard
            deleteCreditCard={deleteCreditCard}
            editCreditCard={editCreditCard}
            setEditCreditCardOpen={setEditCreditCardOpen}
            {...state}
          />
        )}
      </div>
    </GlobalContextDispatch.Provider>
  );
};

export default AppContainer;

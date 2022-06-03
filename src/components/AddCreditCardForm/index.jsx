import { useContext, useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import Form from '@rjsf/material-ui';
import './addCreditCardForm.css';
import CreditCardMock from '../CreditCardMock';
import { db } from '../../firebase_config';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

const creditCardsDataRef = collection(db, 'creditCardsData');

const AddCreditCardForm = (props) => {
  const [docEditing, setDocEditing] = useState({});

  useEffect(() => {
    if (props.editCreditCardOpen && props.deleteCard) {
      const getDocument = async (id) => {
        const userDoc = doc(db, 'creditCardsData', id);
        const docSnap = await getDoc(userDoc);
        setDocEditing(docSnap.data());
      };
      getDocument(props.deleteCard);
    }
  }, [props.deleteCard]);
  const addCreditCard = async (formData) => {
    await addDoc(creditCardsDataRef, { ...formData });
  };

  const editCreditCard = async (id, formData) => {
    const userDoc = doc(db, 'creditCardsData', id);
    await updateDoc(userDoc, formData);
  };

  const getDefaultValuesForEdit = (docEditing, editVal) => {
    if (props.editCreditCardOpen) {
      return docEditing[editVal];
    }
  };

  const schema = {
    type: 'object',
    required: ['cardNumber', 'valid', 'cardHolder', 'securityCode'],
    properties: {
      cardNumber: {
        type: 'string',
        title: 'Card Number',
        placeholder: 'cc',
        default: getDefaultValuesForEdit(docEditing, 'cardNumber'),
      },
      valid: {
        type: 'string',
        title: 'Valid Thru',
        default: getDefaultValuesForEdit(docEditing, 'valid'),
      },
      cardHolder: {
        type: 'string',
        title: 'Card Holdername',
        default: getDefaultValuesForEdit(docEditing, 'cardHolder'),
      },
      securityCode: {
        type: 'string',
        title: 'Security Code CVV',
        default: getDefaultValuesForEdit(docEditing, 'securityCode'),
      },
    },
  };
  return (
    <>
      <button
        type='button'
        className='btn-back'
        onClick={() => {
          props.setFormOpen(false);
          props.setEditCreditCardOpen(false);
        }}
      >
        BACK
      </button>
      {props.editCreditCardOpen && <CreditCardMock {...docEditing} />}
      <Form
        schema={schema}
        onChange={({ formData }) => {
          if (props.editCreditCardOpen) {
            setDocEditing((prevState) => ({ ...prevState, ...formData }));
          }
        }}
        onSubmit={({ formData }) => {
          if (props.editCreditCardOpen) {
            editCreditCard(props.deleteCard, formData);
            props.setEditCreditCardOpen(false);
          } else {
            addCreditCard(formData);
            props.setFormOpen(false);
          }
        }}
      ></Form>
    </>
  );
};

export default AddCreditCardForm;

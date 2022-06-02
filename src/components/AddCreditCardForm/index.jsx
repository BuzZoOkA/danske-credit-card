import { useContext } from 'react';
import Form from '@rjsf/material-ui';
import './addCreditCardForm.css';
import { GlobalContextDispatch } from '../ApplicationContainer/AppContainer';

const getDefaultValuesForEdit = (props, editVal) => {
  if (props.editCreditCardOpen) {
    return props.editCreditCardFormData[editVal];
  }
  return '';
};

const AddCreditCardForm = (props) => {
  const dispatch = useContext(GlobalContextDispatch);
  const schema = {
    type: 'object',
    required: ['cardNumber', 'valid', 'cardHolder', 'securityCode'],
    properties: {
      cardNumber: {
        type: 'string',
        title: 'Card Number',
        placeholder: 'cc',
        default: getDefaultValuesForEdit(props, 'cardNumber'),
      },
      valid: {
        type: 'string',
        title: 'Valid Thru',
        default: getDefaultValuesForEdit(props, 'valid'),
      },
      cardHolder: {
        type: 'string',
        title: 'Card Holdername',
        default: getDefaultValuesForEdit(props, 'cardHolder'),
      },
      securityCode: {
        type: 'string',
        title: 'Security Code CVV',
        default: getDefaultValuesForEdit(props, 'securityCode'),
      },
    },
  };

  console.log('The props are', props);
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
      <Form
        schema={schema}
        onSubmit={({ formData }) => {
          if (props.editCreditCardOpen) {
            props.editCreditCard(props.editCreditCardFormData.id, formData);
            props.setEditCreditCardOpen(false);
            dispatch({
              type: 'EDIT_CREDIT_CARD_FORM_DATA',
              payload: {},
            });
          } else {
            props.addCreditCard(formData);
            props.setFormOpen(false);
          }
        }}
      ></Form>
    </>
  );
};

export default AddCreditCardForm;

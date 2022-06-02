import Form from '@rjsf/material-ui';
import './addCreditCardForm.css';

const AddCreditCardForm = (props) => {
  console.log('The props in form are', props);
  const schema = {
    type: 'object',
    required: ['cardNumber', 'valid', 'cardHolder', 'securityCode'],
    properties: {
      cardNumber: {
        type: 'string',
        title: 'Card Number',
        placeholder: 'cc',
      },
      valid: {
        type: 'string',
        title: 'Valid Thru',
      },
      cardHolder: {
        type: 'string',
        title: 'Card Holdername',
      },
      securityCode: {
        type: 'string',
        title: 'Security Code CVV',
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
      <Form
        schema={schema}
        onSubmit={({ formData }) => {
          props.addCreditCard(formData);
          props.setFormOpen(false);
        }}
      ></Form>
    </>
  );
};

export default AddCreditCardForm;

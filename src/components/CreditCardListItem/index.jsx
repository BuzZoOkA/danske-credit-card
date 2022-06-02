import { useContext } from 'react';
import './creditCardListItem.css';
import { GlobalContextDispatch } from '../ApplicationContainer/AppContainer';

const CreditCardListItem = ({
  cardHolder,
  cardNumber,
  id,
  valid,
  deleteCreditCard,
  setEditCreditCardOpen,
  securityCode,
  setDeleteCard,
}) => {
  const dispatch = useContext(GlobalContextDispatch);
  return (
    <div className='list-item'>
      <div className='card-name-container'>
        <div>{cardHolder}</div>
        <div>{cardNumber}</div>
      </div>
      <div className='valid-thru-container'>
        <div>{valid}</div>
      </div>
      <div className='button-container'>
        <button
          className='btn delete'
          onClick={() => {
            deleteCreditCard(id);
            setDeleteCard(id);
          }}
        >
          Delete Card
        </button>
        <button
          className='btn edit'
          onClick={() => {
            setEditCreditCardOpen(true);
            dispatch({
              type: 'EDIT_CREDIT_CARD_FORM_DATA',
              payload: { cardHolder, cardNumber, id, valid, securityCode },
            });
          }}
        >
          Edit Card
        </button>
      </div>
    </div>
  );
};

export default CreditCardListItem;

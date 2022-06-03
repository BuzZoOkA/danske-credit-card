import { useContext } from 'react';
import './creditCardListItem.css';
import { db } from '../../firebase_config';
import { collection, deleteDoc, doc } from 'firebase/firestore';

const creditCardsDataRef = collection(db, 'creditCardsData');

const deleteCreditCard = async (id) => {
  const userDoc = doc(creditCardsDataRef, id);
  await deleteDoc(userDoc);
};

const CreditCardListItem = ({
  cardHolder,
  cardNumber,
  id,
  valid,
  setEditCreditCardOpen,
  setDeleteCard,
}) => {
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
            setDeleteCard(id);
            deleteCreditCard(id);
          }}
        >
          Delete Card
        </button>
        <button
          className='btn edit'
          onClick={() => {
            setDeleteCard(id);
            setEditCreditCardOpen(true);
          }}
        >
          Edit Card
        </button>
      </div>
    </div>
  );
};

export default CreditCardListItem;

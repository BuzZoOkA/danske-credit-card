import './creditCardListItem.css';
const CreditCardListItem = ({
  cardHolder,
  cardNumber,
  id,
  valid,
  deleteCreditCard,
  setEditCreditCardOpen,
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
        <button className='btn delete' onClick={() => deleteCreditCard(id)}>
          Delete Card
        </button>
        <button
          className='btn edit'
          onClick={() => setEditCreditCardOpen(true)}
        >
          Edit Card
        </button>
      </div>
    </div>
  );
};

export default CreditCardListItem;

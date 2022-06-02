import './dashboard.css';
import CreditCardListItem from '../CreditCardListItem';

const Dashboard = (props) => {
  return (
    <>
      <h2>List of Credit Cards </h2>
      <button
        className='add-button-container'
        onClick={() => {
          props.setEditCreditCardOpen(true);
        }}
      >
        + Add Credit Card
      </button>
      <div className='list-item-container'>
        {props.creditCardData.map((card) => (
          <CreditCardListItem
            key={card.id}
            deleteCreditCard={props.deleteCreditCard}
            setEditCreditCardOpen={props.setEditCreditCardOpen}
            {...card}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;

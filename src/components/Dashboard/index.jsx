import { useEffect, useState } from 'react';
import './dashboard.css';
import CreditCardListItem from '../CreditCardListItem';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase_config';

const creditCardsDataRef = collection(db, 'creditCardsData');

const Dashboard = (props) => {
  const [dashboardData, setDashboardData] = useState([]);
  useEffect(() => {
    const getCreditCardsData = async () => {
      const data = await getDocs(creditCardsDataRef);
      const creditCardsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDashboardData(creditCardsData);
    };
    getCreditCardsData();
  }, [props.formOpen, props.editCreditCardOpen, props.deleteCard]);
  console.log('dashboardData', dashboardData);
  return (
    <>
      <h2>List of Credit Cards </h2>
      <button
        className='add-button-container'
        onClick={() => {
          props.setFormOpen(true);
        }}
      >
        + Add Credit Card
      </button>
      <div className='list-item-container'>
        {dashboardData.map((card) => (
          <CreditCardListItem
            key={card.id}
            setDeleteCard={props.setDeleteCard}
            setEditCreditCardOpen={props.setEditCreditCardOpen}
            {...card}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;

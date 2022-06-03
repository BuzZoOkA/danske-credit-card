import './creditCardMock.css';
const CreditCardMock = (props) => {
  return (
    <div className='credit-card-container'>
      <div className='card-number'>{props.cardNumber}</div>
      <div className='card-holder'>
        Cardholder Name
        <div className='card-holder-name'> {props.cardHolder}</div>
      </div>
      <div className='valid-thru'>
        <div className='valid-thru-text'>Valid Thru</div>
        {props.valid}
      </div>
    </div>
  );
};

export default CreditCardMock;

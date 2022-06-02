const CreditCardMock = (props) => {
  return (
    <>
      {props.cardNumber}
      {props.cardHolder}
      {props.securityCode}
      {props.valid}
    </>
  );
};

export default CreditCardMock;

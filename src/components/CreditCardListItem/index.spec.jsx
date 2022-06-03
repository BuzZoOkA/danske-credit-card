import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from '.';
import React from 'react';
import { getDocs } from 'firebase/firestore';
import CreditCardListItem from '../CreditCardListItem';

Enzyme.configure({ adapter: new Adapter() });
describe('Testing CreditCardListItem', () => {
  const listItemProps = {
    valid: '1122',
    securityCode: '123456',
    cardHolder: 'Rachit Verma',
    cardNumber: '123443214567789665',
    id: 'UPn6SNgV3vbIzgxmrUQ3',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const setDeleteCard = jest.fn();
  const setEditCreditCardOpen = jest.fn();

  const shallowMount = (props = {}) =>
    shallow(
      <CreditCardListItem
        setDeleteCard={setDeleteCard}
        setEditCreditCardOpen={setEditCreditCardOpen}
      />
    );
  it('Test presence of delete button and its onclick', () => {
    const wrapper = shallowMount({
      ...listItemProps,
    });
    expect(wrapper.find('button')).toHaveLength(2);
    const deleteButton = wrapper.find('button').at(0);
    deleteButton.simulate('click');
    expect(setDeleteCard).toHaveBeenCalledTimes(1);
  });

  it('Test presence of edit button and its onclick', () => {
    const wrapper = shallowMount({
      ...listItemProps,
    });
    expect(wrapper.find('button')).toHaveLength(2);
    const editButton = wrapper.find('button').at(1);
    editButton.simulate('click');
    expect(setEditCreditCardOpen).toHaveBeenCalledTimes(1);
  });
});

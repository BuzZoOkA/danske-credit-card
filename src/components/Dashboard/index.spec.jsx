import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from '.';
import React from 'react';
import { getDocs } from 'firebase/firestore';
import CreditCardListItem from '../CreditCardListItem';

Enzyme.configure({ adapter: new Adapter() });
describe('Testing the Dashboard', () => {
  beforeEach(() => {
    let users;
    const mockResponseData = [
      {
        valid: '1122',
        securityCode: '123456',
        cardHolder: 'Rachit Verma',
        cardNumber: '123443214567789665',
        id: 'UPn6SNgV3vbIzgxmrUQ3',
      },
    ];
    users = mockResponseData.map((e) => ({ ...e }));
    jest.clearAllMocks();
    global.fetch = jest.fn(async () => ({
      json: async () => mockResponseData,
    }));
  });

  const shallowMount = (props = {}) => shallow(<Dashboard />);
  it('renders credit card list items', () => {
    const wrapper = shallowMount();
    wrapper.update();
    expect(wrapper.find('button')).toHaveLength(1);
  });
});

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// EnzymeAdapter
import AppContainer from '.';
Enzyme.configure({ adapter: new Adapter() });
describe('Testing the Application container', () => {
  const shallowMount = (props = {}) => shallow(<AppContainer />);
  it('Testing the render', () => {
    const wrapper = shallowMount();
    expect(wrapper.length).toBe(1);
  });
});

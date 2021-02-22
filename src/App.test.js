import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';
import DisplayGeoNames from "./components/DisplayGeoNames";

test('renders element with virtual trips coding ', () => {
  render(<App />);
  const headerElement = screen.getByText(/virtual trips coding challenge/i);
  expect(headerElement).toBeInTheDocument();
});

it('DisplayGeoNames renders correctly', () => {
  const tree = renderer
      .create(<DisplayGeoNames/>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});

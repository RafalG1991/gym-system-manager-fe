import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Bmi} from "./Bmi";

const setup = (bmiNum: string) => {
  render(<Bmi bmi={bmiNum}/>)
  const bmiGrade = screen.getByTestId('bmiGrade-element');
  return {
    bmiGrade,
  };
};

it('Bmi grade element renders successfully with the content passed in a prop', () => {
  const {bmiGrade} = setup('20');
  expect(bmiGrade).toBeInTheDocument();
  expect(bmiGrade).toHaveTextContent('20');
});

it('Bmi grade element is red if passed bmi value is greater than or equal to 30', () => {
  const {bmiGrade} = setup('30');
  expect(bmiGrade).toHaveStyle(`background-color: ${'#ed4a4a'}`);
});

it('Bmi grade element is red if passed bmi value is less than 17', () => {
  const {bmiGrade} = setup('16');
  expect(bmiGrade).toHaveStyle(`background-color: ${'#ed4a4a'}`);
});

it('Bmi grade element is yellow if passed bmi value is in the range <24.99, 30)', () => {
  const {bmiGrade} = setup('26');
  expect(bmiGrade).toHaveStyle(`background-color: ${'#f3d22b'}`);
});

it('Bmi grade element is yellow if passed bmi value is in the range <17, 18.5)', () => {
  const {bmiGrade} = setup('18');
  expect(bmiGrade).toHaveStyle(`background-color: ${'#f3d22b'}`);
});

it('Bmi grade element is green if passed bmi value is greater than or equal to 18.5 but less than 24.99', () => {
  const {bmiGrade} = setup('20');
  expect(bmiGrade).toHaveStyle(`background-color: ${'#2adf14'}`);
});
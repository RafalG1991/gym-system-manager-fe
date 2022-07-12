import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthForm } from './AuthForm';

describe('loads and display two different views based on register prop', () => {
  it('loads and display sign in view', () => {
    render(<AuthForm />);
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Sign In');
    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
    expect(screen.getByLabelText('Login:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.queryByLabelText('Confirm Password:')).not.toBeInTheDocument();
  });

  it('loads and display sign up view', () => {
    render(<AuthForm register={true}/>);
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Sign Up');
    expect(screen.getByRole('button')).toHaveTextContent('Sign up');
    expect(screen.getByLabelText('Login:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
  });
});

describe('Form validation', () => {

  describe('sign in form validation', () => {
    const setup = () => {
      render(<AuthForm />)
      const login = screen.getByLabelText('Login:');
      const password = screen.getByLabelText('Password:');
      const button = screen.getByRole('button');
      return {
        login,
        password,
        button,
      };
    };

   it('login validation - if not valid display error on blur and keep button disabled', () => {
     const {login, button} = setup();
     expect(button).toBeDisabled();
     fireEvent.change(login, {target: {value: '123'}});
     fireEvent.blur(login);
     expect(screen.getByText('Login must be a valid e-mail address')).toBeInTheDocument();
     expect(button).toBeDisabled();
   });

    it('login validation - if valid not display error on blur', () => {
      const {login, button} = setup();
      expect(button).toBeDisabled();
      fireEvent.change(login, {target: {value: 'test@test.com'}});
      fireEvent.blur(login);
      expect(screen.queryByText('Login must be a valid e-mail address')).not.toBeInTheDocument();
    });

    it('password validation - if not valid display error on blur and keep button disabled', () => {
      const {password, button} = setup();
      expect(button).toBeDisabled();
      fireEvent.change(password, {target: {value: '123456'}});
      fireEvent.blur(password);
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    it('password validation - if valid not display error on blur', () => {
      const {password, button} = setup();
      expect(button).toBeDisabled();
      fireEvent.change(password, {target: {value: '12345678'}});
      fireEvent.blur(password);
      expect(screen.queryByText('Password must be at least 8 characters')).not.toBeInTheDocument();
    });

    it('form validation - if valid enable the button', () => {
      const {password, login, button} = setup();
      expect(button).toBeDisabled();
      fireEvent.change(login, {target: {value: 'test@test.com'}});
      fireEvent.change(password, {target: {value: '12345678'}});
      expect(button).toBeEnabled();
    });
  });

  describe('sign up form validation', () => {
    const setup = () => {
      render(<AuthForm register={true}/>)
      const login = screen.getByLabelText('Login:');
      const password = screen.getByLabelText('Password:');
      const confirmPassword = screen.getByLabelText('Confirm Password:');
      const button = screen.getByRole('button');
      return {
        login,
        password,
        confirmPassword,
        button,
      };
    };

    it('password validation - display an error message when password does not match the confirm password inut field', () => {
      const {password, confirmPassword, button} = setup();
      expect(button).toBeDisabled();
      fireEvent.change(password, {target: {value: '12345678'}});
      fireEvent.change(confirmPassword, {target: {value: '123456789'}});
      fireEvent.blur(confirmPassword);
      expect(screen.getByText('The password confirmation must match entered password.')).toBeInTheDocument();
      expect(button).toBeDisabled();
    });

    it('password validation - do not display an error if password matches the confirm password input field', () => {
      const {password, confirmPassword, button} = setup();
      expect(button).toBeDisabled();
      fireEvent.change(password, {target: {value: '12345678'}});
      fireEvent.change(confirmPassword, {target: {value: '12345678'}});
      fireEvent.blur(confirmPassword);
      expect(screen.queryByText('The password confirmation must match entered password.')).not.toBeInTheDocument();
    });

    it('form validation - enable the sign up button if the form is valid', () => {
      const {login, password, confirmPassword, button} = setup();
      expect(button).toBeDisabled();
      fireEvent.change(login, {target: {value: 'test@test.com'}});
      fireEvent.change(password, {target: {value: '12345678'}});
      fireEvent.change(confirmPassword, {target: {value: '12345678'}});
      expect(button).toBeEnabled();
    });
  });
});

# GYM System Manager Project

Gym management web application that allows you to support clients accounts, gym passes and gym classes life schedule. Track upcoming events, calculate your BMI, check your membership status and prolong your gym pass.

This is the frontend part of the project. To see the backend part visit: https://github.com/RafalG1991/gym-system-manager-be

## Tech stack

#### frontend
- React with TypeScript
- react-testing-library for components tests
- Cypress for e2e tests

#### backend
- Node.js
- Express.js with TypeScript
- MySQL database (MariaDB)
- passport with JWT authentication
- Jest for unit tests

## About development

In this project I used create-react-app with react-app-rewired-alias and customize-cra for backend-frontend shared types support.
I made this project with functional TypeScript react components and CSS Module styling. 

Authorization and authentication is handled by AuthProvider using Context. After component render and on every location change (useLocation) app checks if user has a valid token and is authenticated by fetching the `/api/user/me` endpoint. On success, it gets user data payload. Otherwise, it calls the signOut method which clears the user data. AuthProvider supports also signing in and signing up calling proper backend endpoints. Every fetch includes credentials due to httpOnlyCookie used for exchanging authentication token between front and backend.

Displaying errors to user is handled by ErrorProvider using Context. It provides dispatchError method and error state. State is changing for 7 seconds and is transmitted to ErrorMessage component to display the error message to user.

UserDataProvider delivers user data for all application. It also supports data change - BMI, firstname, lastname and password.

This project uses React Router v6 with different views and paths for authenticated and unauthenticated app and fullcalendar for gym class life schedule.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run cy:run`

Launches e2e Cypress tests in 

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
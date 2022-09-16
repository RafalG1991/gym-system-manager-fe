<!--
Thanks for using the template!

Don't forget to give this project a star for additional support ;)
Maybe you can mention me or this repo in the acknowledgements too
-->
<div align="center">
  <img src="https://user-images.githubusercontent.com/92755273/190659291-ac953a00-e0a6-41ac-b2f6-bd6a559c0728.png" alt="logo">
  <h1>GYM System Manager Project</h1>
  <p>Gym management web application that allows you to support clients accounts, gym passes and gym classes live schedule. Track upcoming events, calculate your BMI, check your membership status and prolong your gym pass.</p>
</div>

This is the frontend part of the project. To see the backend part with REST API visit: https://github.com/RafalG1991/gym-system-manager-be

## 💡 Live preview

[GYM System Manager live preview](https://rg.networkmanager.pl/)

## ⚙️ Tech stack

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

## 📝 About development

In this project I used create-react-app with react-app-rewired-alias and customize-cra for backend-frontend shared types support.
I made this project with functional TypeScript react components and CSS Module styling. 

Authorization and authentication is handled by AuthProvider using Context. After component render and on every location change (useLocation) app checks if user has a valid token and is authenticated by fetching the `/api/user/me` endpoint. On success, it gets user data payload. Otherwise, it calls the signOut method which clears the user data. AuthProvider supports also signing in and signing up calling proper backend endpoints. Every fetch includes credentials due to httpOnlyCookie used for exchanging authentication token between front and backend.

For now project doesn't support refresh token functionality so the user is signing out after 5 minutes (intentionally short jwt expiration time for safety reasons).

Displaying errors to user is handled by ErrorProvider using Context. It provides dispatchError method and error state. State is changing for 7 seconds and is transmitted to ErrorMessage component to display the error message to user.

UserDataProvider delivers user data for all application. It also supports data change - BMI, firstname, lastname and password.

This project uses React Router v6 with different views and paths for authenticated and unauthenticated app and fullcalendar for gym class life schedule.

## :camera: Screenshots

<div align="center"> 
 <img src="https://user-images.githubusercontent.com/92755273/190658654-fb115da6-9ecc-48b5-9047-424bffe1cc46.png" alt="screenshot">
 <img src="https://user-images.githubusercontent.com/92755273/190658836-24872603-ddab-4277-a310-49d5b881d5bb.png" alt="screenshot">
 <img src="https://user-images.githubusercontent.com/92755273/190659093-6f20d6cd-2803-4156-8827-a2402ec15021.png" alt="screenshot">
</div>

## :gem: Features

#### Logging in and viewing user profile

![login_profile](https://user-images.githubusercontent.com/92755273/190812573-1f9de731-0677-4e8e-90d3-cfc5cc1e3d34.gif)

#### Changing user data

![data_change](https://user-images.githubusercontent.com/92755273/190812713-f7656c81-d0a8-4671-803d-1fa38a7691bb.gif)

#### Prolonging membership

![prolong_membership](https://user-images.githubusercontent.com/92755273/190812906-99fe99fe-5ba2-49e4-b330-85dc80f3f13c.gif)

#### Viewing class schedule

![class_schedule](https://user-images.githubusercontent.com/92755273/190813128-ed21117f-e0f8-4ef5-9ca3-2a62a00e67e3.gif)

#### Error notifications

![notifications](https://user-images.githubusercontent.com/92755273/190813250-21252e5a-f002-43e5-8d7b-fdd6fa26817a.gif)

## Tests

The project was supplied with react-testing-library tests for AuthForm and Bmi components.

e2e tests are made in Cypress and cover signing in and signing up, changing user data, extending membership and view single gym class from the schedule.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run cy:run`

Launches e2e Cypress tests

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

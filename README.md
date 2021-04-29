# Piggy Bank Web

_Current Version v1.0.0_

Piggy Bank Web is the final project for the IT 354 class (Advanced Web Application Development) 
at Illinois State University (ISU), and a complement for the final project called 
Personal Expenses Tracking App (PETA). 

This project is a Front-end Web Single Page Application (SPA) version of PETA project 
designed to help people track their own outgoings and incomes, so they can 
make mindful decisions on their spending in order to save money. 

## Stack

This project is built on top of [React JS Library](https://reactjs.org/) integrated with 
[TypeScript](https://www.typescriptlang.org/) and 
[React Redux](https://react-redux.js.org/). 
Follow below the current libraries and frameworks stack aggregated to this project:

| Libraries                                                         | Versions    |
| ----------------------------------------------------------------- | ----------- |
| [ReactJS](https://reactjs.org/)                                   | ^17.0.2     |
| [TypeScript](https://www.typescriptlang.org/)                     | ^4.2.4      |
| [React Redux](https://react-redux.js.org/)                        | ^7.2.3      |
| [React Persist](https://github.com/rt2zz/redux-persist/)          | ^6.0.0      |
| [Axios](https://github.com/axios/axios)                           | ^0.21.1     |
| [Material-UI](https://material-ui.com/)                           | ^4.11.3     |
| [React Router](https://reactrouter.com/web/guides/quick-start)    | ^5.2.0      |
| [Formik](https://formik.org/)                                     | ^2.2.6      |

## Run

After cloning the code, install the node dependencies:

### `npm install`

Copy the `.env-example` file and rename it to:

### `.env`

Then, run the app in the development mode:

### `npm start`

The App will be available at http://localhost:3000

It has a live-reload implementation, so it will reload if any changes are made in the code

## Build

Execute the following script to generate a build to be deployed:

### `npm run build`

The code will be available at the **build** folder, and the App will be ready for production
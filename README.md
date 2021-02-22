# Virtual Trips JavaScript coding challenge

This project was created for the [Virtual Trips code challenge](https://gitlab.com/virtualtrips/code-challenge).

1. The Questions are answered in Questions.md file.


2. Server runs on Nodejs with Express. The database was loaded to *db/geodatabase.db*.


3. The client was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The code for client resides inside the src directory.


The project is hosted on Heroku. [Click here](https://virtualtour-challenge.herokuapp.com/) for a demo.

*NOTE: The hosting is on a free tier, so it might take a few seconds to wake up on first access.*

##Assumptions
1. Please note that the database had three columns for names (*name*, *asciiname* and *alternatenames*). Only the *name* and *asciiname* columns have been used to run the search query. Please clarify if the requirement is to use alternate names too.


2. The JSON response from the server returns an array of objects with geonameid, name, asciiname, latitude and longitude of the matches.
This is not as per format required in the question but was needed to display lat/long.


4. A Toggle button exists for closest name match. 
   When closest name match is ON, the responses from server are sorted by
   Levenshtein distance to the word in text box.
   At least two characters are needed to get response from the server.
   After receiving the response is sorted/filtered based on whether the toggle is ON or OFF.



## Installation

To install the project locally run the following in project directory.
```yarn install```.


## Available Scripts

First start the server:

```yarn server```

It starts the server on [http://localhost:5000](http://localhost:5000). A proxy in package.json is created to route the requests to server during development.


To start the client run
 `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


To run all tests use `yarn test`.

To run client tests with react use `yarn clientTests`.
This launches the test runner in the interactive watch mode.\

 `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

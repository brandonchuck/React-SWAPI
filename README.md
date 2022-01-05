# Starwars API Application

# Overview

- Starwars character API application built with React JS and Bootstrap.
- Can search individual characters and view information on all characters from the API.

# Website

- See it [here](https://starwars-api-application.herokuapp.com/) on Heroku! 

# Preview

- Viewing all characters
![starwars-api-preview1.png](./public/starwars-api-preview1.png)

- Viewing specific character
![starwars-api-preview2.png](./public/starwars-api-preview2.png)

- View characters that contain user input
![starwars-api-preview3.png](./public/starwars-api-preview3.png)


# Summary

This is my second application using ReactJS but this time I decided to work with an API to pull and display data. I had previously built an expense tracker with ReactJS and used my progressing knowledge of state and hooks to build this application. Working with an API allowed me to get exposure to asynchronous programming and with the use of the Axios library I was easily able to make HTTP request to the Star Wars API (SWAPI). The SWAPI had 2 helpful query parameters, one for searching (/?search=) and one for navigating to specified pages (/?page=). Understanding these parameters and the data they each return was key to pulling the correct data and updating state within the application. Combining these query parameters in a single URL allowed me to incorporate search functionality as well as a pagination bar. Overall, after completing this project I was able to practice and improve my React skills and get experience with a popular API which are foundational to building and understanding full-stack applications. 

- Detailed Features:
    - Utilized Bootstrap 5 for organized and responsive styling.
    - Managed state using functional components and hooks.
    - Used Axios for making HTTP requests to Star Wars API (SWAPI).
    - Utilized async and await for asynchronous API calls.
    - Rendered character rows using .map() technique.
    - Implemented search functionality using the "search" query parameter
    - Implemented pagination for viewing 10 characters at a time and navigating between pages.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Author

Brandon Chuck | Full Stack Developer | [LinkedIn](https://www.linkedin.com/in/brandonchuck/)

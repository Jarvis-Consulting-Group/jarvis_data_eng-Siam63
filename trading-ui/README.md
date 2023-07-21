# Introduction
The purpose of this React application is to mimic what someone might see in a trading application. The application features a front-end with several components. The main components are the navigation bar, where the user can switch between their Dashboard and the Quotes page. The Dashboard will show various pieces of information like the date of birth of the user, their full name, and other important pieces of information regarding the user. Furthermore, the application also features a Quotes page where it will provide the user with the name of the stock purchased and other pieces of information regarding the stock like price etc. The application also has a backend which was made from scratch using the Express library to hit several endpoints via an API.

# Quick Start
Use markdown code block for your quick-start commands
- Have Docker setup
- Install node & npm
- Run npm start to deploy the application on the browswer

# Implemenation
The implementation of the project was done entirely in ReactJS. ReactJS is an extremely powerful framework which packages all the files and allows the use of HTML, CSS and JavaScript to be incorporated into the same entire package. Within the ReactJS project, we can make several files like an SCSS file for designing the application and making it look aesthetically pleasing to the user, JavaScript files to handle all the logistics of the application, and CSS which adds more design capabilities to the app. The backend was designed from scratch. The most important library used for the backend was the Express library. Express is a back-end web application framework which helps us write RESTful APIs. These are endpoints that we hit so that we can make POST, GET and DELETE requests to our service.

# Test
In order to test the application, we made use of the `npm start` command which opens up the application on the browser using the url `https://localhost:3000` and we can view the changes accordingly by opening this up in our favourite web browser. 

# Deployment
This application was deployed using Docker. You can pull the docker image and run the container and view the application on your web browser by following the startup procedure mentioned above. 

# Improvements
Write at least three things you want to improve 
e.g. 
- Incorporate a way to delete quotes
- Make the front-end a bit more functional by using bootstraps to add more aesthetic features to the application
- Adding further exception handling and unit testing to ensure fields aren't empty or NaN are accounted for

# ToDoListApp
## The site is live on `https://rohitrajtodowebapp.netlify.app`

## Steps for running and testing the application on your local machine

Clone the project using `git clone https://github.com/Rohit20Raj/ToDoListApp.git`

## Scripts for running backend
1. Navigate to backend folder in the project directory and run the command `npm i`
2. Set up `.env` file as in `.env.example` and paste your MongoDB connection string
3. Run the command `npm start` to start the server on `http://localhost:5000`

## Scripts for running frontend
1. Navigate to frontend folder in the project directory and run the command `npm i`
2. Run the command `npm start` to start the server on `http://localhost:3000`

## Authentication flow using JWT:-
1. The user will register or log in to the web application by providing their username and password.
2. The server will validate the credentials and will generate a JWT for the user. The server will send the JWT back to the client as a response.
3. The client will store the JWT locally, in the browser’s local storage.
4. The client sends the JWT along with every request to the server that requires authentication or authorization. The JWT can be sent in the request header as an `Authorization` field with the value `Bearer <token>`.
5. The server will receive the request and extracts the JWT from the header or the cookie. The server verifies the signature of the token using the same secret key that was used to generate it. If the signature is valid, the server decodes the payload and extracts the user’s information and claims.
6. The server checks the user’s information and claims against the database or a third-party service to determine if the user is authorized to access the requested resource or perform the requested action. If the user is authorized, the server sends the response to the client. If the user is not authorized, the server sends an error message or redirects the user to a login page.

## Additional Security measures:-
1. Enhanced security with `bcrypt.js` 60-character hashed passwords.
2. Used salt with the password provided by the user for addtional security.
3. Every time the user enters the password, the salt is added with it and is converted into a hash. This hash is then matched with the hash stored on the database in the password field.
4. Passwords can be converted into the hash, but vice versa is not possible. So even if the database is compromised user's password will not be visible to hackers.






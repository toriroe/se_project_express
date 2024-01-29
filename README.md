# 'What to Wear' Back-End

This project is the back-end for the "WTWR: What to Wear" Create React App project. It's an API that is responsible for routing HTTP requests that interact with a database in order to add/update users, and read, add, delete, like, and unlike clothing items.

Authorization middleware is implemented for verifying tokens upon returning to the site after previously being logged in. Middleware for centralized error handling and logging is also used.

It is currently being deployed and hosted on Google Cloud. Site is encrypted with an SSL certificate via certbot.

## Technologies Used

- This is a Node.js app using Express.js framework
- Mongoose is used to interact with a MongoDB database
- pm2 process manager is used to keep app running continuously
- nginx for port configuration/redirecting requests

## Link

[Link to site](https://wtwr.mnode.net/)
[Front-End](https://github.com/toriroe/se_project_react)

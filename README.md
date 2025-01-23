# Full Stack project (book app)

The project demonstrates book app, where users can borrow, return, reserve and rate books. There are also admin users who can
manage books and users. 


## Instructions: 

Node JS and Docker are needed.

Start by cloning the project and ``run npm install`` inside frontend and backend folders. 
Then copy all env.dist files into env files.  

### How to run app in a development mode: 

In the root folder run ``docker compose -f docker-compose.dev.yml up --build`` to set upp databases. 
Then go to the frontend and backend folders and run ``npm run dev`` in each.

### How to run tests: 

In the root folder run ``docker compose -f docker-compose.test.yml up --build`` to set upp a test database.

### Playwright
- go the backend folder and ``npm run start:test`` to run the server on the test mode. 
- go to the frontend folder and ``npm run dev``.
- in the root folder ``npm run test``.

### Backend unit tests:
- go to the backend folder and ``npm run test``.


### The app is available on Render:
https://project-prod-frontend.onrender.com/

Please note that there are some delays on Render (retrieving the books from database etc.) since the app is 
running on a free instance.


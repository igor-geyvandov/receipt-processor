## About

REST API that processes purchase receipts and calculates points awarded for each receipt.

#### Frameworks and libraries used
* Node and Express for server back-end
* Jest for unit testing
* Express-Validator for input validation and sanitizing
* Docker for containerization

## Building and running your application
#### With Docker installed
If you have Docker installed, build image and start app container by running: `docker compose up --build`.

Your application will be available at http://localhost:8080.

#### With Node.js installed
If you have Node installed, first run: `npm install`

Then start your application by running: `npm start`

Your application will be available at http://localhost:4000.

### Unit Tests
Execute unit tests by running:
`npm test`

## API Endpoints
Postman collection with HTTP requests to all endpoints - https://github.com/igor-geyvandov/receipt-processor/tree/main/postman

`GET /` returns heathcheck status

`POST /receipts/process` saves receipt in in-memory collection, and returns `201` with receipt ID. `400` if bad data provided.

`GET /receipts/{id}/points` returns `200` with number of points awarded for the given receipt. `404` if not found.

`GET /receipts/{id}` returns `200` with a sanitized receipt JSON. `404` if not found.

`GET /receipts/count` returns `200` with total count of receipts in collection.



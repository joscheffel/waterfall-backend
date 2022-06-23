# Waterfall service

This project builds a waterfall service within the university course Advance Full Stack Development. This part of the
project is only the backend code. It provides an API for storing and rating of waterfalls. Part of the requirements is
to use the backend framework [hapi](https://hapi.dev/).

---

## Installation

1. Download the source code as zip or clone it via ssh.
2. If you downloaded the zip, then unzip it
3. Next go into the folder placemark. It's the root directory of the project.
4. Here you need to run the following command in the command prompt (Make sure that you got an up to date version of
   node and npm): `npm install`

## Start the application

To start the backend use the following command: `npm start`. Now the application runs on you local machine at
port `3000`. The base url of the service is `http://localhost:3000`.

## Deployment

These are placeholder for later. They will be added once the application got deployed via this mechanism.

### Glitch
To deploy to glitch you just need to connect you glitch account with your github account. Then import it by using the gihub repo link. It always uses the main branch by default. When directly importing is not working try other possiblities suggested in the [glitch help forum](https://help.glitch.com/kb/article/20-importing-code-from-github/).
This project is deployed with following link: [waterfalls-backend-service](waterfalls-backend-service)
(This link is the base route for the Glitch deployment).

### Cloud Atlas

### Heroku

---
##Documentation
When running the application you find a OpenAPI (Swagger) Documentation of the API at `<urlOfDeployment>/documentation`.
I.e. if you run on localhost you will find the documentation at [http://localhost:3000/documentation](http://localhost:3000/documentation).

## Usage
There are several API routes available and can be looked up in the file [api-routes.js](./src/api-routes.js) or in the OpenApi documentation at `<urlOfDeployment>/documentation`.
(I.e. if you run on localhost you will find the documentation at [http://localhost:3000/documentation](http://localhost:3000/documentation))
The base route for the APIs are `http://my.url.yz/api` where `my.url.yz` is the exposed url. When accessing users you append the
API base route with `/users`. We can either get (`HTTP GET`), create (`HTTP POST`), update (`HTTP PUT`) or
delete (`HTTP DELETE`) users. The REST Pattern is followed. The same applies to the waterfalls by using `/waterfalls`
instead of the user route.

The user object has the following structure:

````json
{
  "firstName": "Homer",
  "lastName": "Simpson",
  "email": "homer@simpson.com",
  "password": "aSecretYouMustNotShare!",
  "isAdmin": false,
  "_id": "62b44b300d0ff1c3bcc55d64"
}
````

And a sample waterfall object looks as follows:

````json
{
  "_id": "62b45022a85eff476f5d073e",
  "name": "Niagara Falls",
  "location": {
    "lat": 43.0799,
    "long": -79.0747
  },
  "description": "Amazing falls",
  "categories": {
    "continent": "North America",
    "size": "large"
  },
  "userid": "62b44b300d0ff1c3bcc55d64",
  "__v": 0
}
````

The `_id` is created by the backend.
Later a more detailed API documentation will be provided with swagger.

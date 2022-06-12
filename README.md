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

### Cloud Atlas

### Heroku

## Usage

There are several API routes available and can be looked up in the file [api-routes.js](./src/api-routes.js). The base
route for the APIs are `http://my.url.yz/api` where `my.url.yz` is the exposed url. When accessing users you append the
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
  "_id": "a6ab4789-7d98-450f-a8f5-aa37373ce4ec"
}
````

And a sample waterfall object looks as follows:

````json
{
  "name": "Niagara Falls",
  "location": {
    "lat": 43.0799,
    "long": -79.0747
  },
  "description": "Make sure to stay there until the night.",
  "_id": "a79cddeb-c323-4a07-9f2a-cd7caa0fe82e"
}
````

The `_id` is created by the backend.
Later a more detailed API documentation will be provided with swagger.
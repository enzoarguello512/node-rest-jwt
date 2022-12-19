<p align="center">
  <a href="https://morfi-react.vercel.app">
    <img src="https://i.imgur.com/cDNjn1M.png" alt="The Morfi logo" height="100">
  </a>
  <h1 align="center">node-rest-jwt</h1>
  <p align="center">RESTful API using NodeJs, Express, Mongoose, Typescript and JSON Web Tokens<p>
  <p align="center">
    <img alt="Version" src="https://img.shields.io/badge/version-0.2.1-blue.svg?cacheSeconds=2592000" />
    <a href="https://github.com/enzoarguello512/api-rest-ecommerce#readme" target="_blank">
      <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
    </a>
    <a href="https://github.com/enzoarguello512/api-rest-ecommerce/graphs/commit-activity" target="_blank">
      <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
    </a>
    <a href="https://github.com/enzoarguello512/api-rest-ecommerce/blob/master/LICENSE" target="_blank">
      <img alt="License: MIT" src="https://img.shields.io/github/license/enzoarguello512/node-rest-jwt" />
    </a>
    <a href="https://twitter.com/enzoarguello512" target="_blank">
      <img alt="Twitter: enzoarguello512" src="https://img.shields.io/twitter/follow/enzoarguello512.svg?style=social" />
    </a>
  </p>
</p>

Greetings 👋 and welcome to the [morfi](https://github.com/enzoarguello512/morfi) backend server repository, which contains the code that manages the store page, user registration and client communication. In addition, the [front-end section of the application](https://github.com/enzoarguello512/morfi-react) has been updated to React, which is responsible for communicating with the server.

## ✨ Active deployments

> (Please bear in mind that the site will take a while to load since it's deployed on a free tier, but it will load, just give it some time 😉)

- [https://morfi-react.vercel.app](https://morfi-react.vercel.app) - Front-end deployment in vercel.
- [https://node-rest-jwt.onrender.com](https://node-rest-jwt.onrender.com) - Back-end deployment in render (cold start ❄️, so it will be the slower of the two).

## 📦 Main features

- Session management with JSON Web Tokens (aka "jwt") (authentication, session inactivity, auto-login, token rotation, etc)
- Artillery performance testing
- Nodemailer and Twilio for sending emails, SMS and whatsapp messages
- Query-based filtering of products
- A socket.io-based chat implementation
- Swagger-made documentation
- You can upload images to the cloud with cloudinary and express-fileupload
- Application logging with winston
- Utilizing CORS for whitelisting origins
- Mocha, chai, supertests for unit testing
- Multi-threading and clustering are optional methods to improve performance.

### ⚡ Future features

- Validation with express-validator

## 📄 Documentation

You can find API documentation by running the server locally in [http://localhost:8080/docs](http://localhost:8080/docs) or in json format in [http://localhost:8080/docs.json](http://localhost:8080/docs.json). In case of postman, you can find it at this URL:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/21804622-0cbf027e-b7d9-43d9-b3fa-8420678ff43e?action=collection%2Ffork&collection-url=entityId%3D21804622-0cbf027e-b7d9-43d9-b3fa-8420678ff43e%26entityType%3Dcollection%26workspaceId%3D24718fbd-be5a-41e1-a995-e91f81e3a8fe)

  <img src="https://user-images.githubusercontent.com/75096734/208274577-0ad2dc20-f114-4679-9158-a4ea25e5b867.png" alt="swagger documentation" height="300">

### 🔓 Authentication

In order to avoid misunderstandings, I will proceed to explain authentication in the following paragraph. 👇

JWT tokens are validated using middleware called [`JwtMiddleware`](https://github.com/enzoarguello512/node-rest-jwt/blob/main/src/services/auth/middleware/jwt.middleware.ts) and [`PermissionMiddleware`](https://github.com/enzoarguello512/node-rest-jwt/blob/main/src/common/middleware/common.permission.middleware.ts). These middleware can be commented out or removed to accelerate the testing process.

[`JwtMiddleware`](https://github.com/enzoarguello512/node-rest-jwt/blob/main/src/services/auth/middleware/jwt.middleware.ts) is in charge of reading and decrypting the tokens stored in the authorization request and attaching them in the response that is passed to the next middleware using `res.locals.jwt`, the tokens should be sent in `Bearer ${token}` format to work correctly.

In contrast, [`PermissionMiddleware`](https://github.com/enzoarguello512/node-rest-jwt/blob/main/src/common/middleware/common.permission.middleware.ts) checks a user's permissions. 😅

As soon as a user is authenticated, they are given an _access token_ (in the response body) and a _refresh token_ (in the response headers). The _access token_ validates that they are authenticated and that they have sufficient permissions, while the _refresh token_ is used to see whether or not the session is still active and to create new _access tokens_ (which expire every 10 minutes).

A total of two endpoints require cookies (to function correctly), while the rest use _access tokens_.

- **/auth** is used to authenticate **an already registered user**, using email and password, and if successful it returns 2 tokens, the _refresh token_ and the _access token_, this endpoint does not require cookies.
- **/auth/refresh-token** allows you to renew the _refresh token_ and the _access token_ and extend the lifetime of your session, which by default lasts 24 hours (the lifetime of the _refresh token_), this endpoint requires the _refresh token_ to be stored in the cookies.
- **/auth/logout** is responsible for deleting the client's _refresh token_, this endpoint requires that the _refresh token_ is stored in the cookies.

✍ **The [front-end of the application](https://github.com/enzoarguello512/morfi-react) already handles all this, however, if you wish to make a request by hand, include the following headings:**

- Using the JWT requires authorization (in this case a Bearer followed by a token).

  ```javascript
  headers.set('authorization', `Bearer ${token}`);
  ```

- You may be able to include the credentials (cookies) in your request, but that is not necessary if you access any other endpoint than **/auth/\*\***

  ```javascript
  credentials: 'include';
  ```

  An [example of the frontend code](https://github.com/enzoarguello512/morfi-react/blob/f32a1d0e0ecaccd72266cbb8f553390b60ca3f2e/src/app/api/apiSlice.tsx#L20) responsible for performing this task.

#### 🚀 Example using postman

<img src="https://user-images.githubusercontent.com/75096734/208273023-801073a1-bf18-433c-adb9-59f7411b1384.png" alt="Example of refresh token in the postman interface" height="200">
<img src="https://user-images.githubusercontent.com/75096734/208273305-629efb38-1e90-41af-b8db-564a44efa241.png" alt="Example of access token in the postman interface" height="200">

## ❌ Problems encountered

- In cluster mode, socket.io generates errors

## 👨‍💻 Install

```sh
npm install
```

## 🔥 Usage

**This requires that you have already pre-configured the ".env" file. You can find the example in [.env.example](https://github.com/enzoarguello512/node-rest-jwt/blob/develop/.env.example).**
We use `npm run development` because `npm start` is reserved for production environments. If you start with `npm start`, you'll have to include your origin in the [app.config.ts](https://github.com/enzoarguello512/node-rest-jwt/blob/3bff15c66a00b1ea61601f72492ebde0f4d5e7cf/src/components/app/app.config.ts#L6) file to avoid CORS errors.

```sh
npm run development
```

## 🧪 Run tests

```sh
npm run test
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check
[issues page](https://github.com/enzoarguello512/api-rest-ecommerce/issues). You
can also take a look at the [contributing guide](https://github.com/enzoarguello512/api-rest-ecommerce/blob/master/CONTRIBUTING.md).

## 📝 License

Copyright © 2022 [enzoarguello512](https://github.com/enzoarguello512).<br />
This project is
[MIT](https://github.com/enzoarguello512/api-rest-ecommerce/blob/master/LICENSE)
licensed.

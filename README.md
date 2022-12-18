<h1 align="center">Welcome to node-rest-jwt 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
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

> RESTful API using NodeJs, Express, Mongoose, Typescript and JSON Web Tokens

### Commit temporal (explicación del proyecto, después hago uno mas prolijo):

#### Deploy del proyecto

✨ [Deploy](morfi-react.vercel.app)

Este proyecto esta basado en un repositorio previo,
[morfi](https://github.com/enzoarguello512/morfi), que lo actualice y lo adapte
a React (el frontend de esta aplicación), lo podes encontrar en
[morfi-react](https://github.com/enzoarguello512/morfi-react), la mayoría de
las funciones están integradas al frontend así que se pueden probar directamente
desde ahí, pero si gustas, podes leer la documentacion y hacer las peticiones de
manera manual.

Esta es la parte backend del servidor, tiene varios módulos (se pueden ver en el
package.json), lo mas destacable son los endpoints, esta todo documentado usando
swagger, se puede usar la UI en la ruta local
[http://localhost:8080/docs](http://localhost:8080/docs), tambien existe la posibilidad de crear tu propia colleccion usando la ruta [http://localhost:8080/docs.json](http://localhost:8080/docs.json), y sino se puede probar
con postman, la url es la siguiente:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/21804622-0cbf027e-b7d9-43d9-b3fa-8420678ff43e?action=collection%2Ffork&collection-url=entityId%3D21804622-0cbf027e-b7d9-43d9-b3fa-8420678ff43e%26entityType%3Dcollection%26workspaceId%3D24718fbd-be5a-41e1-a995-e91f81e3a8fe)

<img src="https://user-images.githubusercontent.com/75096734/208274577-0ad2dc20-f114-4679-9158-a4ea25e5b867.png" alt="docs" height="200">

La única ruta que te puede llegar a dar problemas puede ser la de autenticación,
que es usada en toda la aplicación y se maneja usando tokens de jwt guardados en
las cookies del cliente y en las peticiones, pero la manera fácil si te querés
evitar esto y querés probar la api igual es directamente comentar los middleware
de `JwtMiddleware` o `PermissionMiddleware`.

- La ruta **/auth** le enviás tu email y contraseña por medio de POST y te devuelve
  2 tokens, uno en las cookies de la respuesta (que es el refresh token) y otro
  en el cuerpo de la respuesta (que es el access token), el access token le
  permite saber al servidor que estas autenticado y que tenes los permisos
  suficientes para realizar la operación y el refresh token permite conocer si
  todavía tenes la sesión activa (y también se usa para crear nuevos tokens de
  acceso, que expiran cada 10 minutos), todo esto para hacer una rotacion de
  tokens y tener un poquito mas de seguridad.
- La ruta **/auth/refresh-token** te permite renovar el refresh token y el access token
  y extender así el tiempo de vida de tu sesión, que por default dura 24 horas
  (lo que dure el tiempo de vida del refresh token).
- La ruta **/auth/logout** que se encarga de borrar la cookie del cliente y el token de
  refresco si así existiera.

**Entonces para hacer un peticion cualquiera tendrias que incluir en los headers
lo siguiente:**

- La autorizacion (en este caso un Bearer seguido del token) para el uso de JWT.

  ```javascript
  headers.set('authorization', `Bearer ${token}`);
  ```

- Dependiendo del método que uses seguramente tengas una opcion para incluir las
  credenciales (las cookies) en tu petición, que si bien no son 100% necesarias
  (ya con el access token te debería dejar) te puede llegar a servir con las
  rutas de autenticación por si las queres probar.

  ```javascript
  credentials: 'include';
  ```

Ejemplo utilizando postman:

<img src="https://user-images.githubusercontent.com/75096734/208273023-801073a1-bf18-433c-adb9-59f7411b1384.png" alt="refresh token postman" height="200">
<img src="https://user-images.githubusercontent.com/75096734/208273305-629efb38-1e90-41af-b8db-564a44efa241.png" alt="access token postman" height="200">

Otra cosa a destacar si es que vas a filtrar los productos es que solo funcionan
ciertas categorías y no el 100% de los filtros, los que funcionan por ahora son
“Categories”, “Promotions”, “Region”, “Payment” y la barra de búsqueda para
introducir un nombre personalizado de producto. En un futuro pienso expandirlo
para que funcione todo al 100%.

No se probo todo al 100% por un tema de tiempo, voy a seguir arreglando cosas
igual antes de hacer un push a main, pero tendría que andar, me faltarían
validaciones mejores pero eso lo puedo agregar después

## Como correr el server

Para arrancar el servidor en modo local haces lo clasico, `npm install` y `npm start` o si lo
queres probar en modo desarrollo `npm run development` o mi preferido `npm run devpm2`

**Cabe resaltar que hay que contar con el fichero ".env" ya pre-configurado para
que no te tire ningun error, podes encontrar el ejemplo en [.env.example](https://github.com/enzoarguello512/node-rest-jwt/blob/develop/.env.example)**

Otra cosa a recalcar es que todavia no puse una opcion para actualizar dependencias, osea, me refiero a que si por ejemplo borras el carrito de compras de un usuario, el usuario va a seguir teniendo ese id del carrito de compras (que ya no existe) y esto posiblemente haga un error en el frontend

### 🏠 [Homepage](https://github.com/enzoarguello512/api-rest-ecommerce#readme)

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

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

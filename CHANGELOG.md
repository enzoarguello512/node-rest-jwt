# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.1.0](https://github.com/enzoarguello512/api-rest-ecommerce/compare/v0.0.7...v0.1.0) (2022-11-02)


### ⚠ BREAKING CHANGES

* rename server.ts to index.ts
* Moved all code to src/ folder.

### Features

* add cloudinary, express-fileupload, nodemailer, twilio, @types/express-fileupload and @types/nodemailer modules. ([d94ab40](https://github.com/enzoarguello512/api-rest-ecommerce/commit/d94ab4080dd568ffdd514b85530215db71d4887f))
* add cloudinary, mail and twilio services. ([bd7c060](https://github.com/enzoarguello512/api-rest-ecommerce/commit/bd7c0602d1fe950fbb9ec2d5a6eb546815cf7fc1))
* add configuration file for pm2. ([b439f8b](https://github.com/enzoarguello512/api-rest-ecommerce/commit/b439f8b5193377b1f041a2a0e30905573ad36b6c))
* add interfaces and error types. ([176b805](https://github.com/enzoarguello512/api-rest-ecommerce/commit/176b805496426cec34d306ba33d1125089f8e912))
* add log level property. ([d02463f](https://github.com/enzoarguello512/api-rest-ecommerce/commit/d02463fa70f3a8e0cfa4be3d56d2f77ac312be76))
* add middleware for file upload. ([8963cfc](https://github.com/enzoarguello512/api-rest-ecommerce/commit/8963cfc8672a5316aef41c53915db2d6fe6eeed5))
* add middleware to transform user order. ([94e45c5](https://github.com/enzoarguello512/api-rest-ecommerce/commit/94e45c588652bc520aa332676b3cf2897963b3cd))
* add new transport for winston module errors. ([383f5de](https://github.com/enzoarguello512/api-rest-ecommerce/commit/383f5de6aa484d4ef6e1a210fc1776d02eda5af1))
* add patch method to cart endpoints. ([dd9ffe8](https://github.com/enzoarguello512/api-rest-ecommerce/commit/dd9ffe8c6357676985f808820428e8cec487c4d5))
* add pm2 and artillery modules and scripts. ([90ac0be](https://github.com/enzoarguello512/api-rest-ecommerce/commit/90ac0beb2c2ab9c956750b2e45b41d7fe37eb3cf))
* add template for orders. ([7302268](https://github.com/enzoarguello512/api-rest-ecommerce/commit/730226871b140d344d8a1a24643b406999a3a64e))
* add transport for winston (new logger object). ([bf3b680](https://github.com/enzoarguello512/api-rest-ecommerce/commit/bf3b6804dd9a3143a781591c65af3ef697d7e382))
* add ts-node-dev and yargs modules. ([c91249c](https://github.com/enzoarguello512/api-rest-ecommerce/commit/c91249c0cdfe2bd6448db10af4f1ff477e0aecef))
* add user communication services. ([6b4f811](https://github.com/enzoarguello512/api-rest-ecommerce/commit/6b4f811d28ea6d445f075570fc3f5ad54cfc16ec))
* create src folder. ([3965f61](https://github.com/enzoarguello512/api-rest-ecommerce/commit/3965f610eb2cc418d1e5a8c308e2922e9b873b17))


### Bug Fixes

* add ability to upload images to the product. ([2fa4541](https://github.com/enzoarguello512/api-rest-ecommerce/commit/2fa454159fd26ea3068bb0cb7a84968d19c7d908))
* add ability to upload images to the user. ([a576eee](https://github.com/enzoarguello512/api-rest-ecommerce/commit/a576eee03a4a02abdaf88f2e547d98cdec4d4d98))
* add comments and fix minor bugs. ([461c250](https://github.com/enzoarguello512/api-rest-ecommerce/commit/461c25008e1b401f598947665cdad11c7b4ae175))
* add config variable settings. ([9daca04](https://github.com/enzoarguello512/api-rest-ecommerce/commit/9daca042805ef49cb4ccb9482f3aef5f85db0b1b))
* add new properties to the user and product models. ([a36de94](https://github.com/enzoarguello512/api-rest-ecommerce/commit/a36de94315b8e4ea5a6d895ec7a071779857022f))
* add notification levels. ([5bf828b](https://github.com/enzoarguello512/api-rest-ecommerce/commit/5bf828ba50c8bbf84709fdaada0b821f2ef7b2a3))
* add services and method correction. ([55c10d0](https://github.com/enzoarguello512/api-rest-ecommerce/commit/55c10d036d736365a12ed270cf715959045f2d81))
* add the orders routes to the main app. ([48a7928](https://github.com/enzoarguello512/api-rest-ecommerce/commit/48a792841693efa54190783fa313f40dbe6979f1))
* add twilio whatsapp service number. ([defb1e1](https://github.com/enzoarguello512/api-rest-ecommerce/commit/defb1e151557ee66295edda27e31a3b552ff1955))
* adjust template to order model. ([6dbee5b](https://github.com/enzoarguello512/api-rest-ecommerce/commit/6dbee5bc80a92f0d9c1c8cf559ad77f50b479880))
* change application startup in docker. ([828557f](https://github.com/enzoarguello512/api-rest-ecommerce/commit/828557f56d3025418ffcfd3a7e898eadf03c3654))
* change ICrud interface signature. ([cff9090](https://github.com/enzoarguello512/api-rest-ecommerce/commit/cff9090903749d7fd161370d7e0c29131722429f))
* change interface name and methods. ([2cc6fd5](https://github.com/enzoarguello512/api-rest-ecommerce/commit/2cc6fd5eb383cdbd7046732fb5c270fe8169f4c4))
* combine ErrorHandler and errorStructure. ([eea40d4](https://github.com/enzoarguello512/api-rest-ecommerce/commit/eea40d4b3ca5e79071d05db63d150add13fb8145))
* delete unused files. ([74294fb](https://github.com/enzoarguello512/api-rest-ecommerce/commit/74294fb7ca92a40e4a2f162a43f254c8c4bd69db))
* file upload middleware error. ([6aafc71](https://github.com/enzoarguello512/api-rest-ecommerce/commit/6aafc71cdaa7c83dfae44f902cf95716f995ba03))
* move "config" folder out of "src" folder. ([10b23dd](https://github.com/enzoarguello512/api-rest-ecommerce/commit/10b23dd6db20b57227e60d3306591054c0b99457))
* order properties and modify optional. ([4d3ef6f](https://github.com/enzoarguello512/api-rest-ecommerce/commit/4d3ef6f372d6f54e66692b9cd8e6f5e88018a096))
* remove path to "config" folder and environment variables. ([4ea4638](https://github.com/enzoarguello512/api-rest-ecommerce/commit/4ea4638aa0670e725a524116dce3f33b7bed9b30))
* remove unused code. ([8ce8ec0](https://github.com/enzoarguello512/api-rest-ecommerce/commit/8ce8ec08936750ebf83ae73a70eb49c3a84e4a99))
* remove unused middleware. ([41a41db](https://github.com/enzoarguello512/api-rest-ecommerce/commit/41a41dbbbe3c025b325fb738538f9574a6dff89b))
* remove unused services. ([90a9858](https://github.com/enzoarguello512/api-rest-ecommerce/commit/90a98587c81f49d2869c63d4d6cc2cb793bfeb94))
* rendering error. ([6fa32bb](https://github.com/enzoarguello512/api-rest-ecommerce/commit/6fa32bb7d178d36551dc25b38c5318f13b4f3bfa))
* temporarily fix the registration form. ([67bb5f8](https://github.com/enzoarguello512/api-rest-ecommerce/commit/67bb5f8e4dd1b7fcd6c1d1659969c600aeb686af))
* twilio service (sandbox). ([d894e88](https://github.com/enzoarguello512/api-rest-ecommerce/commit/d894e88e8855270dff301cba23f2b81989f36bd9))
* update endpoint to create order. ([350c5c6](https://github.com/enzoarguello512/api-rest-ecommerce/commit/350c5c6fd5c6adec8fe7daa268aa6c0f91aaf24d))
* update methods and types. ([ac69ed5](https://github.com/enzoarguello512/api-rest-ecommerce/commit/ac69ed562365cecef16efadabdeeb675d97399e5))
* update model and order dto. ([917c9d3](https://github.com/enzoarguello512/api-rest-ecommerce/commit/917c9d3dec8de63698adcdc376a85365a2664ea9))
* update routes, variables and modules. ([3811062](https://github.com/enzoarguello512/api-rest-ecommerce/commit/381106230d19ae9e3419808dca2634f11af64513))


* rename server.ts to index.ts ([8dfa81f](https://github.com/enzoarguello512/api-rest-ecommerce/commit/8dfa81f5d11aecfd3cfa0ba213cf5f4c2cd82edd))

### [0.0.7](https://github.com/enzoarguello512/api-rest-ecommerce/compare/v0.0.6...v0.0.7) (2022-09-14)


### Features

* update methods and add createOrRead. ([41d450b](https://github.com/enzoarguello512/api-rest-ecommerce/commit/41d450b7336f4fb4d2c6b47757cbad21b10fff54))


### Bug Fixes

* add consistency in responses. ([57339b3](https://github.com/enzoarguello512/api-rest-ecommerce/commit/57339b3a185eb4b2e9015fee7e0fa6052b7e4db1))
* add parameters to middleware. ([1bf147d](https://github.com/enzoarguello512/api-rest-ecommerce/commit/1bf147d275f21f6a0f28b6d91941d3fa0e93b80c))
* change routing method. ([ebb765c](https://github.com/enzoarguello512/api-rest-ecommerce/commit/ebb765c4cd86f2af7ecd3dacf422bfeb83251aba))
* comment out unnecessary code and fix server responses. ([cb6b180](https://github.com/enzoarguello512/api-rest-ecommerce/commit/cb6b180d3cda10935b302b208f74fe30853f249c))
* correct errors and simplify the code. ([a6341b4](https://github.com/enzoarguello512/api-rest-ecommerce/commit/a6341b497be44a3ae8d1b3dc410ed1d7105de09a))
* request error and remove middleware session. ([b2e9bc9](https://github.com/enzoarguello512/api-rest-ecommerce/commit/b2e9bc9f4e12b5815b561ccb09b5b4bc122c52d0))
* update for createOrRead implementation. ([0b74fbe](https://github.com/enzoarguello512/api-rest-ecommerce/commit/0b74fbe9ca395b01457dc586a1098c3653ccf257))
* update IJwt interface. ([24b7466](https://github.com/enzoarguello512/api-rest-ecommerce/commit/24b7466bdfc323042bfa3434f9883dcddcefe4c6))

### [0.0.6](https://github.com/enzoarguello512/api-rest-ecommerce/compare/v0.0.5...v0.0.6) (2022-09-10)


### Features

* separate environments and configurations. ([fbc1759](https://github.com/enzoarguello512/api-rest-ecommerce/commit/fbc1759e9e582843a1ce68b802f0f33c7936ae07))


### Bug Fixes

* persistence error. ([1875f16](https://github.com/enzoarguello512/api-rest-ecommerce/commit/1875f166a89c078e32033f463c79fd4275e94bef))
* update docker image. ([f884eff](https://github.com/enzoarguello512/api-rest-ecommerce/commit/f884eff80dd5e2a80b05db516ac7ea9172c62484))
* update image settings. ([ae65b41](https://github.com/enzoarguello512/api-rest-ecommerce/commit/ae65b413f9b1d8065975856b42b11f12220a354a))
* update insert mode. ([8036ca2](https://github.com/enzoarguello512/api-rest-ecommerce/commit/8036ca2ac8157bdfd2a84988bd2fc5c3b1ccdd62))
* update interfaces and models. ([ccfee73](https://github.com/enzoarguello512/api-rest-ecommerce/commit/ccfee73e1ab3c3dab541a0c19aa29afcd3f825c1))
* update models and references. ([c75d724](https://github.com/enzoarguello512/api-rest-ecommerce/commit/c75d724bf9288fa167e6902f266ad1f9e96c52b4))
* update properties and middleware of the product model. ([57a6b8f](https://github.com/enzoarguello512/api-rest-ecommerce/commit/57a6b8ffefc24f3bf55bc0310bdc54332c8475ab))
* update startup parameters. ([2874147](https://github.com/enzoarguello512/api-rest-ecommerce/commit/287414719e537f687212fb087e81c8f7208f415c))
* update the list of enabled domains. ([2113ffc](https://github.com/enzoarguello512/api-rest-ecommerce/commit/2113ffc3c0323b7db064c5bc9fb7952ffcaa8c8c))
* updated scripts and package listing. ([56483af](https://github.com/enzoarguello512/api-rest-ecommerce/commit/56483af65920a7637a2a93f896ea1975d14a629a))

### 0.0.5 (2022-09-07)

### [0.0.4](https://github.com/enzoarguello512/api-rest-ecommerce/compare/v0.0.2...v0.0.4) (2022-08-25)


### Features

* add "mongodb-memory-server-core" and "mongodb" packages ([b980316](https://github.com/enzoarguello512/api-rest-ecommerce/commit/b98031625d243ff1bd51b7bcd63e79aa283b4cdd))


### Bug Fixes

* add base template for cart.mongoose.dao ([301ff5a](https://github.com/enzoarguello512/api-rest-ecommerce/commit/301ff5afddad8e6d9fd30cdfb31b158d3be7bd2e))
* add last try and catch block. ([20a3f0b](https://github.com/enzoarguello512/api-rest-ecommerce/commit/20a3f0b40dba817ca6aa7102b6e91e392c992bc1))
* add next & try/catch to controllers. ([731731f](https://github.com/enzoarguello512/api-rest-ecommerce/commit/731731fc3ada2ad5f23546903a9f40ecfef84564))
* add types and new function to get the server url. ([3da7af9](https://github.com/enzoarguello512/api-rest-ecommerce/commit/3da7af93e5d28bbc60a2573d797181d659294a8a))
* added constructor, model and create method to cart dao. ([df1a342](https://github.com/enzoarguello512/api-rest-ecommerce/commit/df1a342180da6bd2bc6d0fb78425007ac429dc4d))
* aggregate missing methods (under construction). ([e576280](https://github.com/enzoarguello512/api-rest-ecommerce/commit/e576280604e57a12e3f022c42d4493d0493e3d57))
* change names to lowercase and remove development settings. ([c0edb3f](https://github.com/enzoarguello512/api-rest-ecommerce/commit/c0edb3f284ccd5ed32f3d864d26348a9f7e7b50a))
* correct non-existent key and simplify method to obtain url. ([a0ce863](https://github.com/enzoarguello512/api-rest-ecommerce/commit/a0ce86388d6461fa963ac2d03050c09ce6dedc99))
* correct routes and persistence name (import) ([6e11cc6](https://github.com/enzoarguello512/api-rest-ecommerce/commit/6e11cc6b9bab10b6f52187ee8ddd54a81a2271fe))
* create cart.mongoose.dao and migrate to mongoose v6. ([5ea0022](https://github.com/enzoarguello512/api-rest-ecommerce/commit/5ea002252e62b9b0a9bdb4530ffeff80c55c83c3))
* distribution update ([9a156ef](https://github.com/enzoarguello512/api-rest-ecommerce/commit/9a156ef6d87e10aede0c5a1aea1e263deb87d797))
* fix naming errors and minor corrections. ([3cd9e20](https://github.com/enzoarguello512/api-rest-ecommerce/commit/3cd9e20f8217ea5efe3e28fbc102b816b92087be))
* minor bug fixes and update addProduct and deleteProductById methods. ([0b33ec9](https://github.com/enzoarguello512/api-rest-ecommerce/commit/0b33ec9c54b4b9bddcea86df7106f46c986d3eaf))
* move mongoose service, add interface and test server ([d7b3fa4](https://github.com/enzoarguello512/api-rest-ecommerce/commit/d7b3fa4dfbab547a8fd81cbc7b8f102acc98e8ae))
* replace _id with id. ([5d44912](https://github.com/enzoarguello512/api-rest-ecommerce/commit/5d44912f5ea4831087fa0ebf49702214ffbef4b4))
* separate mongoose models in folders. ([f048335](https://github.com/enzoarguello512/api-rest-ecommerce/commit/f0483356f78fc6be6593039f018151b9ab693f39))
* testing and consistency with postman. ([013b420](https://github.com/enzoarguello512/api-rest-ecommerce/commit/013b4205ecf66ee9f633927df1c3d1c3e4c0992b))
* update cart middleware. ([72c66cc](https://github.com/enzoarguello512/api-rest-ecommerce/commit/72c66cc7ce51a5f8e7c5b9c40de2a3f321d1a260))
* update cart routes. ([71f78bb](https://github.com/enzoarguello512/api-rest-ecommerce/commit/71f78bbc638b93374d8171566c6a05f55f1234a2))
* update connection method to mongodb. ([57b2cd8](https://github.com/enzoarguello512/api-rest-ecommerce/commit/57b2cd8a5cf316b190eb45b9283726eaf9dfd3e8))
* update interfaces to work with mongoose. ([d65d0f7](https://github.com/enzoarguello512/api-rest-ecommerce/commit/d65d0f79cce158a4296c367155332d144fcfa9ef))
* update method and model names. ([1638bc0](https://github.com/enzoarguello512/api-rest-ecommerce/commit/1638bc07eec1f70b800fc4db5354437db7705384))
* update models for working with mongoose. ([93ed608](https://github.com/enzoarguello512/api-rest-ecommerce/commit/93ed608068a222e614760285fb88872fad7db5b2))

### 0.0.2 (2022-08-23)


### Features

* add standard release support. ([96a9bb3](https://github.com/enzoarguello512/api-rest-ecommerce/commit/96a9bb3cc249f306b47fe93721b119ee990b3a10))


### Bug Fixes

* add default configuration for mongo atlas. ([c62b955](https://github.com/enzoarguello512/api-rest-ecommerce/commit/c62b955a6627fd7f085187d3c7ce84ad4a13452c))

# Cypress Tests for the Catch of the Day Project

## Origins of this Project

This Cypress project was created as an examples for those curious to play around with Cypress but don't want to get a full project setup. I have given a presentation several times on the topic and have a written article on the conent available:

- [presentation slides](https://cypress-retro.micleners.com/)
- [article](https://github.com/micleners/cypress-retro)

## Cypress Project

The purpose of this repo is to offer an easy to test project using Cypress. In the main directory you will find a `Cypress` folder. This contains the Cypress tests and helpers that make it possible.

## Test Project (Catch of the Day)

The project Cypress is testing was built by following along the [React For Beginners](https://reactforbeginners.com/) course by Wes Bos. If you're interested in the project that is being tested, I highly encourage you taking this or any of his courses.

The main contents of this project are found in the `src` folder within the main directory.

I chose to use TypeScript on top of JavaScript to provide typing in these files. This helped me to write the tests and I'm sure it'll help you understand them.

## Getting Started

In the local directory where you want to set up this project, clone this repository and change into the directory

`git clone https://github.com/micleners/cypress-cotd.git`

`cd cypress-cotd`

Then install the node packages

`npm install`

_Note: If this fails because it could not find Python, this is likely because packages from Firebase have gotten out of date. Try force installing:_
`npm install --force`

After installation is complete, run the Cypress tests:

`npm run cypress`

You'll **notice** that some tests are failing! This is because some tests are running against the [deployed version](https://cypress-cotd.micleners.com/) of this app, while others are running against the [local version](http://localhost:3000/). To get the local versions to pass, start up your local development server of the Test Project:

`npm run start`

## Exploring Tests

#### create-store.spec.ts

The first test file of interest is `create-store.spec.ts`. This is where I test both the `webUrl` (https://cypress-cotd.micleners.com/) and the `localUrl` (http://localhost:3000/) as mentioned above. Feel free to explore and mess around with these tests. I chose a few different methods of testing to highlight the power of Cypress commands, dropping into JQuery for element inspection, and dropping into Chai for further assertions.

#### order-fish.spec.ts

The second test file is `order-fish.spec.ts`. To streamline the tests here, I just used one URL variable `url`, and committed it with the web URL (https://cypress-cotd.micleners.com/) so that tests would pass even if the local server isn't running. Feel free to start the local server with `npm run start` and swap out the `url` to run the tests locally.

There are a few tests provided in these file, however I left room for you to implement further tests. Have fun exploring!

## Files in Project

The following is the directory structure of the project. The main folders you will be interested in are `cypress` and `src`:

```
▸ build/
▸ cypress/
▸ node_modules/
▸ public/
▸ src/
```

Within the Cypress folder you have the `integration` folder which contains our tests. The `support` folder contains the custom Cypress commands - a great feature in Cypress.

```
▾ cypress/
  ▸ fixtures/
  ▾ integration/
   - create-store.spec.ts
   - order-fish.spec.ts
  ▸ plugins/
  ▾ support/
   - commands.js
   - index.js
  - tsconfig.json
```

The actual Catch of the Day project is contained in the `src` folder.

```
▾ src/
  ▸ components/
  ▸ css/
  - base.js
  - helpers.js
  - index.js
  - react-app-env.d.ts
  - sample-fishes.js
```

Other files include this `README.md`. We also have `cypress.json` where the environment variables are stored. You are probably familiar with `package.json`, where the packages and startup scripts are contains. Lastly, `tsconfig.json` contains some rules for `TypeScript`.

```
- README.md
- cypress.json
- debug.log
- package-lock.json
- package.json
- security-rules.json
- tsconfig.json

## Setting Up Auth
Currently, Auth with Firebase is deactivate with this project. However, you can feel free to uncomment the lines of code around this and get this project setup with auth. Then, try to test your authentication with [this package](https://github.com/lirantal/cypress-social-logins).
```

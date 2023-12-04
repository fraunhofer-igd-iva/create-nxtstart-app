# Nxtstart

Nxtstart is an easy to use, interactive CLI tool to bootstrap your next web-based project.
The template is aimed at students to get an easy access to web development with example implementations.
It is also useful for experts to speed up prototyping.
The framework is based on NextJS and Material UI.

Published and maintained by [IVA @ Fraunhofer IGD](https://www.igd.fraunhofer.de/en.html) in Darmstadt, Germany.

# Getting Started

Run the app in any command prompt with node installed using yarn

```
yarn create nxtstart-app
```

or npm

```
 npm init nxtstart-app
```

or install the package using

```
npm i -g create-nxtstart-app
create-nxtstart-app
```

in any command prompt with node installed.

Follow the instructions presented by the interface.
Currently Material UI, internationalization framework and ESLint are non optional and will be installed by default as they are relevant for all example pages. The remaining packages are only preinstalled if chosen during creation.

# Necessary steps after creating your project

## General

- Run `yarn install` (or `npm install` for npm) once to make sure all dependencies are installed.
- Fill the `.env` file with necessary variables where nxtstart placed placeholder data.
- If you selected Prisma, refer to the corresponding section of this README before running your app.
- Run the project using `yarn run dev` (or `npm run dev` for npm) from the project root.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/[locale]/page.tsx`. The page auto-updates as you edit the file.
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
See [Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing) to learn about the different ways the app router works. Api endpoints are located in `app/api/*` using `route.ts` files nested in folders that represent the path of the URL.
- Nxtstart creates a `/nxtstart.config.json` file in the project root. This file contains the preinstalled examples and can be removed once you don't want to use the default landing page and default NavBar tabs.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Code Style

To enforce code style, ESLint is installed by default and Prettier can be installed additionally. Run the lint run configuration in the `package.json` to check for errors or setup automatic linting, the steps to do that depend on your code editor. If Prettier is chosen, additional run configurations are added.

## Husky Git Hooks

Depends on Prettier. Husky is used to run Prettier before every commit.
**Every time the repository is cloned, the hooks have to be enabled again using `yarn run prepare` (or `npm run prepare` for npm)**.

## I18n - Internationalization

By default nxtstart projects come with internationalization options.
Under `/locales` the different languages are placed. Each language directory contains multiple json files that can be as granular as necessary.
Using these translations can be done as seen in `/pages/[locale]/page.tsx` and `/components/NavBar.tsx` using the TranslationProvider.

## Material UI

Used as the main design library. Use the sx prop on the Mui components for styling. This can be done using shared styles across components or component specific styles.
Additionally the theme is provided by Material UI and light/dark mode is implemented by default.
To see the responsive behavior of Mui components take a look at the example page linked on the landing page.

## Redux

We implemented Redux as an optional state manager for Nxtstart. The store can be found `/store/*`.

## Prisma

### Initialization

After setting the DATABASE_URL in the `.env` according to your used DB, generate the schema using `yarn prisma db pull` (or `npx prisma db pull` for npm) and generate the client using `yarn run db:generate` (or `npx prisma generate` for npm). The examples implemented in this template are built using the world sample database for MySQL that can be obtained [here](https://dev.mysql.com/doc/index-other.html). They will not work with a custom database out of the box but can be rewritten easily using our code as an example.

### For later changes to the database:

To update the db using prisma.scheme:

- Update File
- Run `yarn prisma db push` (or `npx prisma db push` for npm) (may reset tables or entire database)
- OR do proper migrate using `yarn prisma migrate dev` (or `npx prisma migrate dev` for npm)
- Run `yarn run db:generate` (or `npx prisma generate` for npm) (generates prisma client)

To receive update from database:

- Update DB
- Run `yarn prisma db pull` (or `npx prisma db pull` for npm) (updates schema)
- Run `yarn run db:generate` (or `npx prisma generate` for npm) (generates prisma client)

## Next Auth

Set the necessary variables in `.env` and create the necessary applications on the third party sites you want to use.

The example is using Github in the `.env`. See the [Docs](https://next-auth.js.org/configuration/providers/oauth#built-in-providers) for more details.

## D3

For all sorts of visual analytics and other visualizations D3 provides a wide vaiety of charts and graphs with a high degree of customizability. Checkout the example page if you chose to install it under `/d3`.

## Cypress Testing

Run tests using `yarn run test` (or `npm run test` for npm) or open the GUI using `yarn run cypressGui` (or `npm run cypressGui` for npm).

The example specifications for the authentication (including the test for the restricted api route) won't work for the current nxtstart as it requires an admin login, but the concept of writing tests should still become clear.

## Progressive Web App

The example provides a basic service worker, manifest.json and necessary assets to get started. See `/worker/index.js` to edit the service worker.
To disable PWA edit `/next.config.js`.

## WebWorker

WebWorker provide the ability to perform expensive calculations in seperate threads without freezing the main webpage and allowing further interaction by the user without interruption.
Check out `/webWorker/*.ts` for some examples.

## Server-Sent-Events

The example depends on D3 graphs and therefore cannot be used without installing D3 and its examples.

# Deployment of your project

To create an optimized production build run the command `yarn run build` (or `npm run build` for npm).

To run the build created in the `.next` folder you can run `yarn run start` (or `npm run start` for npm).

# Contributing to Nxtstart

We appreciate every contribution to this project but **please read the [Contributing Guidelines](https://github.com/fraunhofer-igd-iva/create-nxtstart-app/blob/main/CONTRIBUTING.md) before opening an issue or PR**.

# License

Nxtstart is [ISC](https://github.com/fraunhofer-igd-iva/create-nxtstart-app/blob/main/LICENSE) licensed.

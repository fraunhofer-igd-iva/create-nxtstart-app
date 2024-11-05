<p align="center">
  <img src="public/img/favicon.ico" />
</p>

Nxtstart is an easy to use, interactive CLI tool to bootstrap your next web-based project.
The template is aimed at students to get an easy access to web development with example implementations.
It is also useful for experts to speed up prototyping.
The framework is based on NextJS and Material UI.

Published and maintained by [IVA @ Fraunhofer IGD](https://www.igd.fraunhofer.de/en.html) in Darmstadt, Germany.

# Build errors due to dependency updates?

Nxtstart tries to install the latest versions of all dependecies in the default configuration. Should you encounter errors with examples that are not compatible with the latest versions of some dependecies please create an issue with the full build or error log.

Until we implement the changes to accomodate the new requirements by dependencies you can rerun nxtstart and disable the option to use the latest dependency versions and rather use an older tested state of all dependecies.

# Run your project

## General

- Run `yarn install` (or `npm install` for npm) once to make sure all dependencies are installed.
- Fill the `.env` file with necessary variables where nxtstart placed placeholder data.
- If you selected Prisma, refer to the corresponding section of this README before running your app.
- Run the project using `yarn dev` (or `npm run dev` for npm) from the project root.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
  You can start editing the page by modifying `app/[locale]/page.tsx`. The page auto-updates as you edit the file.
  This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
- Nxtstart creates a `/nxtstart.config.json` file in the project root. This file contains the preinstalled examples and can be removed once you don't want to use the default landing page and default NavBar tabs.
- Additionally the default landing page provides useful links for all included libraries and links to all implemented examples that you can explore.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### App Router Basics

- See [Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing) to learn about the different ways the app router works.
- All pages are nested under `app/[locale]/*` and written in `page.tsx` files, nested in folders that represent the path of the URL. These files are always server components and can therefore not hold state.
- Server components are executed and rendered on the server before sending to the client, client components are hydrated during the rendering on the client and allow for interaction.
- Client components can be nested in pages or other server components, however server components nested in client components will also be rendered on the client (**except if you insert them via a children prop into the client component**).
- All API routes are nested under `app/api/*` and written in `route.ts` files, nested in folders that represent the path of the URL. The files export functions for every REST method that is supported by a route.
- Server actions are asynchronous server functions that can be called from components directly instead of going through an API endpoint, see [Server Action Docs](https://nextjs.org/docs/app/api-reference/functions/server-actions) for details.

# Package specific information

Currently Material UI, the internationalization framework and ESLint are non optional and will be installed by default as they are relevant for all example pages. The remaining packages are only preinstalled if chosen during creation.

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

After setting the DATABASE_URL in the `.env` according to your used DB, generate the schema using `yarn prisma db push` (or `npx prisma db push` for npm) and generate the client using `yarn prisma generate` (or `npx prisma generate` for npm). Finally, run `yarn db:seed` (or `npm run db:seed` for npm) to insert data into the database if you want sample data. 

**These steps can be done by Nxtstart initially if you choose to seed the database at the end, but the database and client are not commited to the repository, so after cloning the project, all three commands have to be executed to build the database and client**

The examples implemented in this template are built using a cities sample database for SQLite that is also generated when using nxtstart. They will not work with a custom database out of the box but can be rewritten easily using our code as an example.

### For later changes to the database:

To update the db using prisma.scheme:

- Update File
- Run `yarn prisma db push` (or `npx prisma db push` for npm) (may reset tables or entire database)
- OR do proper migrate using `yarn prisma migrate dev` (or `npx prisma migrate dev` for npm)
- Run `yarn prisma generate` (or `npx prisma generate` for npm) (generates prisma client)

To receive update from database after adjusting the scheme there directly:

- Update DB
- Run `yarn prisma db pull` (or `npx prisma db pull` for npm) (updates schema)
- Run `yarn prisma generate` (or `npx prisma generate` for npm) (generates prisma client)

### Migrating from SQLite

SQLite is chosen to give a easy entry into a database system with no further outside setup required. However, the featureset is fairly limited. Should your requirements need a more advanced database, the switch should be as easy as exchanging the `DATABASE_URL` in your `.env` and the `provider` attribute in `schema.prisma`. Then you need to run the commands in [Initialization](#initialization) (skip the seeding if not necessary).

## Next Auth

Set the necessary variables in `.env` and create the necessary applications on the third party sites you want to use.

The example is using Github in the `.env`. See the [Docs](https://next-auth.js.org/configuration/providers/oauth#built-in-providers) for more details.

## D3

For all sorts of visual analytics and other visualizations D3 provides a wide vaiety of charts and graphs with a high degree of customizability. Checkout the example page if you chose to install it under `/d3`.

## Cypress Testing

Run tests using `yarn run test` (or `npm run test` for npm) or open the GUI using `yarn run cypressGui` (or `npm run cypressGui` for npm).

The example specifications for the authentication (including the test for the restricted api route) won't work for the current nxtstart as it requires an admin login, but the concept of writing tests should still become clear.

## Progressive Web App

The example provides the necessary icons, assets and manifest.json to get started. The PWA user experience can be further optimized by using service workers for features like offline modes or adapting to users that may lose connection to mobile data while moving around.

## WebWorker

WebWorker provide the ability to perform expensive calculations in seperate threads without freezing the main webpage and allowing further interaction by the user without interruption.
Check out `/webWorker/*.ts` for some examples.

## Server-Sent-Events

The example depends on D3 graphs and therefore cannot be used without installing D3 and its examples.

# Deployment of your project

To create an optimized production build run the command `yarn run build` (or `npm run build` for npm).

To run the build created in the `.next` folder you can run `yarn run start` (or `npm run start` for npm).

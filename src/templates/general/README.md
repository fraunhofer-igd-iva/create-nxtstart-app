This NextJS project was bootstrapped using the Webstart CLI.

# Run your project

- Fill the `.env` file with necessary variables in places where webstart placed placeholder data
- If you selected Prisma, refer to the corresponding section of this README before running your app
- Run the project using `yarn run dev` (or `npm run dev` for npm) from the project root
- Webstart creates a `/webstart.config.json` file in the project root. This file contains the preinstalled examples and can be removed once you don't want to use the default landing page and default NavBar tabs.

# Package specific information

Currently Material UI and the internationalization framework are non optional and will be installed by default as they are relevant for all example pages. The remaining packages are only preinstalled if chosen during creation.

## I18n - Internationalization

By default webstart projects come with internationalization options.
Under `/public/locales` the different languages are placed. Each language directory contains multiple json files that can be as granular as necessary.
Using these translations can be done as seen in `/src/pages/index.tsx` and `/src/components/NavBar.tsx` using serverSideTranslations.

## Material UI

Used as the main design library. Use the sx prop on the Mui components for styling. This can be done using shared styles across components or component specific styles.
Additionally the theme is provided by Material UI and light/dark mode is implemented by default.
To see the responsive behavior of Mui components take a look at the example page linked on the landing page.

## Prisma

### Initialization

After setting the DATABASE_URL in the `.env` according to your used DB, generate the schema using `yarn prisma db pull` (or `npx prisma db pull` for npm) and generate the client using `yarn run db:generate` (or `npx prisma generate` for npm).

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

## Cypress Testing

Run tests using `yarn run test` (or `npm run test` for npm) or open the GUI using `yarn run cypressGui` (or `npm run cypressGui` for npm).

The example specifications for the authentication (including the test for the restricted api route) won't work for the current webstart as it requires an admin login, but the concept of writing tests should still become clear.

## Progressive Web App

The example provides a basic service worker, manifest.json and necessary assets to get started. See `/worker/index.js` to edit the service worker.
To disable PWA edit `/next.config.js`.

## Server-Sent-Events

The example depends on D3 graphs and therefore cannot be used without installing D3 and its examples.

# Deployment of your project

To create an optimized production build run the command `yarn run build` (or `npm run build` for npm).
To run the build created in the `.next` folder you can run `yarn run start` (or `npm run start` for npm).
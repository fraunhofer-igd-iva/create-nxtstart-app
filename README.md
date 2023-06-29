# Usage

After installing the webstart-cli package, run the app in any command prompt using `webstart-cli`.
Follow the instructions presented by the interface.
Currently Material UI and the internationalization framework are non optional and will be installed by default as they are relevant for all example pages.

# Necessary steps after creating your project

## General

- Fill the `.env` file with necessary variables in places where webstart placed placeholder data
- Run the project using `yarn run dev` from the project root
- The Cards on the landing page may link to non existing examples if you chose to not include some in your project.

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

After setting the DATABASE_URL in the `.env` according to your used DB, generate the schema using `yarn prisma db pull` and generate the client using `yarn run db:generate`.

### For later changes to the database:
To update the db using prisma.scheme:
- Update File
- Run `yarn prisma db push` (may reset tables or entire database)
- OR do proper migrate using `yarn prisma migrate dev`
- Run `yarn run db:generate` (generates prisma client)

To receive update from database:
- Update DB
- Run `yarn prisma db pull` (updates schema)
- Run `yarn run db:generate` (generates prisma client)

## Next Auth

Set the necessary variables in `.env` and create the necessary applications on the third party sites you want to use.

The example is using Github in the `.env`. See the [Docs](https://next-auth.js.org/configuration/providers/oauth#built-in-providers) for more details.

## Cypress Testing

Run tests using `yarn run test` or open the GUI using `yarn run cypressGui`.

The example specifications for the authentication (including the test for the restricted api route) won't work for the current webstart as it requires an admin login, but the concept of writing tests should still become clear.

## Progressive Web App

The example provides a basic service worker, manifest.json and necessary assets to get started. See `/worker/index.js` to edit the service worker.
To disable PWA edit `/next.config.js`.

# Deployment of your project

To create an optimized production build run the command `yarn run build`.
To run the build created in the `.next` folder you can run `yarn run start`.

# Development on Webstart

- Install packages using `npm install`
- Install the cli locally using `npm install -g`
- Run the cli in any command prompt using `webstart-cli`
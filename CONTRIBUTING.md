# Contribution Guidelines

When contributing to `create-nxtstart-app`, whether on GitHub or in other community spaces:

- Be respectful, civil, and open-minded.
- Before opening a new pull request, try searching through the [issue tracker](https://github.com/fraunhofer-igd-iva/create-nxtstart-app/issues) for known issues or fixes.
- If you want to make code changes based on your personal opinion(s), make sure you open an issue first describing the changes you want to make, and open a pull request only when your suggestions get approved by maintainers.

## How to Contribute

### Prerequisites

In order to not waste your time implementing a change that has already been declined, or is generally not needed, start by [opening an issue](https://github.com/fraunhofer-igd-iva/create-nxtstart-app/issues/new/choose) describing the problem you would like to solve.

### Setup your environment locally

_Some commands will assume you have the Github CLI installed, if you haven't, consider [installing it](https://github.com/cli/cli#installation), but you can always use the Web UI if you prefer that instead._

In order to contribute to this project, you will need to fork the repository:

```bash
gh repo fork fraunhofer-igd-iva/create-nxtstart-app
```

Then, clone it to your local machine:

```bash
gh repo clone <your-github-name>/create-nxtstart-app
```

Then, install the project's dependencies:

```bash
npm install
```

### Implement your changes

Your changes can be fixes to existing features or adding new options to the Nxtstart portfolio.

### When you're done

Check that your code follows the project's style guidelines by running:

```bash
npm run prettier:fix
```

The templates folder is excluded from prettier to allow for the templating in files that are used by multiple packages.

Please make a manual, functional test of your changes by running the app locally and creating a project with and without your added packages if you added new ones.

When all that's done, it's time to file a pull request to upstream:

```bash
gh pr create --web
```

and fill out the title and body appropriately.

## Credits

This documented was inspired by the contributing guidelines for [create-t3-app](https://github.com/t3-oss/create-t3-app/blob/next/CONTRIBUTING.md).

import shell from 'shelljs'
import chalk from 'chalk'
import * as fs from 'fs'
import path from 'path'

// update when adding new packages
export const fullPackageList = [
  'linting',
  'swr',
  'mui',
  'animations',
  'redux',
  'd3',
  'nextAuth',
  'prisma',
  'i18n',
  'pwa',
  'cypress',
  'sse',
  'webWorker',
  'husky',
]

const frozenVersionsPackageBundles = {
  general: {
    dep: ['sharp@0.33.3'],
    devDep: [],
  },
  linting: {
    dep: [],
    devDep: [
      '@typescript-eslint/eslint-plugin@7.8.0',
      '@typescript-eslint/parser@7.8.0',
      'eslint-config-prettier@9.1.0',
      'prettier@3.2.5',
    ],
  },
  swr: {
    dep: ['swr@2.2.5'],
    devDep: [],
  },
  mui: {
    dep: [
      '@mui/icons-material@5.15.16',
      '@mui/material@5.15.16',
      '@babel/runtime@7.24.5',
      '@emotion/cache@11.11.0',
      '@emotion/react@11.11.4',
      '@emotion/styled@11.11.5',
      '@mui/material-nextjs@5.15.11',
    ],
    devDep: [],
  },
  animations: {
    dep: ['framer-motion@11.1.9'],
    devDep: [],
  },
  redux: {
    dep: ['@reduxjs/toolkit@2.2.3', 'react-redux@9.1.2'],
    devDep: [],
  },
  d3: {
    dep: ['d3@7.9.0'],
    devDep: ['@types/d3@7.4.3'],
  },
  nextAuth: {
    dep: ['next-auth@4.24.7'],
    devDep: [],
  },
  prisma: {
    dep: ['@prisma/client@5.13.0'],
    devDep: ['prisma@5.13.0', '@yarnpkg/pnpify@4.0.1'],
  },
  i18n: {
    dep: ['i18next@23.11.3', 'react-i18next@14.1.1', 'i18next-resources-to-backend@1.2.1', 'next-i18n-router@5.4.2'],
    devDep: [],
  },
  pwa: {
    dep: ['next-pwa@5.6.0', '@babel/core@7.24.5', 'babel-loader@9.1.3', 'webpack@5.91.0'],
    devDep: [],
  },
  cypress: {
    dep: [],
    devDep: ['cypress@13.8.1'],
  },
  sse: {
    dep: ['uuid@9.0.1'],
    devDep: ['@types/uuid@9.0.8'],
  },
  webWorker: {
    dep: [],
    devDep: [],
  },
  husky: {
    dep: [],
    devDep: ['husky@9.0.11', 'lint-staged@15.2.2'],
  },
}

const packageBundles = {
  general: {
    dep: ['sharp'],
    devDep: [],
  },
  linting: {
    dep: [],
    devDep: ['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'eslint-config-prettier', 'prettier'],
  },
  swr: {
    dep: ['swr'],
    devDep: [],
  },
  mui: {
    dep: [
      '@mui/icons-material',
      '@mui/material',
      '@babel/runtime',
      '@emotion/cache',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material-nextjs',
    ],
    devDep: [],
  },
  animations: {
    dep: ['framer-motion'],
    devDep: [],
  },
  redux: {
    dep: ['@reduxjs/toolkit', 'react-redux'],
    devDep: [],
  },
  d3: {
    dep: ['d3'],
    devDep: ['@types/d3'],
  },
  nextAuth: {
    dep: ['next-auth'],
    devDep: [],
  },
  prisma: {
    dep: ['@prisma/client'],
    devDep: ['prisma', '@yarnpkg/pnpify'],
  },
  i18n: {
    dep: ['i18next', 'react-i18next', 'i18next-resources-to-backend', 'next-i18n-router'],
    devDep: [],
  },
  pwa: {
    dep: ['next-pwa', '@babel/core', 'babel-loader', 'webpack'],
    devDep: [],
  },
  cypress: {
    dep: [],
    devDep: ['cypress'],
  },
  sse: {
    dep: ['uuid'],
    devDep: ['@types/uuid'],
  },
  webWorker: {
    dep: [],
    devDep: [],
  },
  husky: {
    dep: [],
    devDep: ['husky', 'lint-staged'],
  },
}

export function addPackages(packageManager, packageNamesUser, projectPath, useLatestVersions) {
  shell.cd(projectPath)

  // add general packages
  const packageNames = ['general', ...packageNamesUser]

  let cmdDep = packageManager === 'yarn' ? 'yarn add' : 'npm install --force'
  let cmdDevDep = packageManager === 'yarn' ? 'yarn add' : 'npm install --force'

  for (let i = 0; i < packageNames.length; i++) {
    const packageName = packageNames[i]
    const packageBundle = useLatestVersions ? packageBundles[packageName] : frozenVersionsPackageBundles[packageName]
    packageBundle.dep.forEach((name) => {
      cmdDep += ` ${name}`
    })
    packageBundle.devDep.forEach((name) => {
      // @yarnpkg/pnpify not needed for npm
      if (packageManager !== 'npm' || name !== '@yarnpkg/pnpify') {
        cmdDevDep += ` ${name}`
      }
    })
  }

  if (cmdDep) {
    shell.exec(cmdDep)
  }

  if (cmdDevDep) {
    cmdDevDep += ` ${packageManager === 'yarn' ? '--dev' : '--save-dev'}`
    shell.exec(cmdDevDep)
  }
  console.log(chalk.green(`Installed using "${cmdDep}"`))
  console.log(chalk.green(`Installed using "${cmdDevDep}"`))
}

export function addVsCodeSdks(projectPath, packageManager) {
  // add vscode sdks if yarn is used
  if (packageManager === 'yarn') {
    shell.cd(projectPath)
    shell.exec('yarn dlx @yarnpkg/sdks vscode')
  }
}

export function updateEnvPrisma(projectPath) {
  fs.appendFileSync(
    path.join(projectPath, '.env'),
    `
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# Example connection string for mysql, update to match your used database and database user
DATABASE_URL="mysql://webstart:webstart@localhost:3306/webstart"

`,
    function (err) {
      if (err) throw err
      console.log(chalk.green('Added Prisma Env'))
    }
  )
}

export function updateEnvNextAuth(projectPath) {
  fs.appendFileSync(
    path.join(projectPath, '.env'),
    `
# Next Auth Variables
GITHUB_ID=<enter github id>
GITHUB_SECRET=<enter github secret>

GOOGLE_CLIENT_ID=<enter google id>
GOOGLE_CLIENT_SECRET=<enter google secret>

# Update according to your deployment address (You can leave this for local development)
NEXTAUTH_URL=http://localhost:3000

# You should replace this secret when deploying your application
SECRET=qwertysecretForTheN3xtJ5Template

`,
    function (err) {
      if (err) throw err
      console.log(chalk.green('Added NextAuth .env!'))
    }
  )
}

export function addRunScripts(projectPath, packages, packageManager) {
  fs.readFile(path.join(projectPath, 'package.json'), 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    let result = data

    if (packageManager === 'yarn') {
      result = result.replace(
        /"scripts": {([^}]+)}/g,
        `"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",<§cypress§>
    "test": "cypress run",
    "cypressGui": "cypress open",</§cypress§>
    "lint": "next lint"<§linting§>,
    "prettierCheck": "yarn prettier . --check",
    "prettierFix": "yarn prettier . --write"</§linting§><§prisma§>,
    "db:generate": "yarn pnpify prisma generate"</§prisma§>
  }<§husky§>,
  "lint-staged": {
    "*.{js,jsx,ts,tsx,css,md,json}": "prettier --write"
  }</§husky§>`
      )
    }
    if (packageManager === 'npm') {
      result = result.replace(
        /"scripts": {([^}]+)}/g,
        `"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",<§cypress§>
    "test": "cypress run",
    "cypressGui": "cypress open",</§cypress§>
    "lint": "next lint"<§linting§>,
    "prettierCheck": "npx prettier . --check",
    "prettierFix": "npx prettier . --write"</§linting§>
  }<§husky§>,
  "lint-staged": {
    "*.{js,jsx,ts,tsx,css,md,json}": "prettier --write"
  }</§husky§>`
      )
    }
    if (packageManager === 'yarn' && packages.includes('prisma')) {
      result = result.replace(
        /"dependencies": {/g,
        `"dependencies": {
	".prisma": "link:./prisma/.prisma/",`
      )
    }

    for (let i = 0; i < fullPackageList.length; i++) {
      const curPackage = fullPackageList[i]
      result = result.replace(new RegExp(`<§${curPackage}§>([^§]+)</§${curPackage}§>`, 'gm'), (match, $1) => {
        // only remove the tags, keep enclosed code in capture group one if the current package is chosen by user
        if (packages.includes(curPackage)) {
          return $1
        } else {
          return ''
        }
      })
    }

    fs.writeFile(path.join(projectPath, 'package.json'), result, 'utf8', function (err) {
      if (err) return console.log(err)
      console.log(chalk.green('Added run scripts!'))
      if (packages.includes('husky')) {
        shell.cd(projectPath)
        if (packageManager === 'yarn') {
          shell.exec('npx husky init')
          shell.exec('echo yarn lint-staged > .husky/pre-commit')
        } else if (packageManager === 'npm') {
          shell.exec('npx husky init')
          shell.exec('echo npx lint-staged > .husky/pre-commit')
        }
      }
    })
  })
}

export function runFinalInstall(packageManager, projectPath) {
  shell.cd(projectPath)

  let cmd = packageManager === 'yarn' ? 'yarn install' : 'npm install'
  const result = shell.exec(cmd)

  console.log(chalk.green(`Final install using "${cmd}"`))

  if (result.code !== 0) {
    return false
  }
  return true
}

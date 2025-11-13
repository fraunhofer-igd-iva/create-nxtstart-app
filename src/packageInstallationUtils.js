import shell from 'shelljs'
import chalk from 'chalk'
import * as fs from 'fs'
import path from 'path'

// update when adding new packages, added package managers to post process dockerfile
export const fullPackageList = [
  'npm',
  'yarn',
  'general',
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
    dep: [],
    devDep: [
      '@eslint/eslintrc@3.3.1',
      '@eslint/js@9.37.0',
      '@next/eslint-plugin-next@15.5.4',
      '@typescript-eslint/eslint-plugin@8.46.0',
      '@typescript-eslint/parser@8.46.0',
      'eslint-plugin-react-hooks@7.0.0',
    ],
  },
  linting: {
    dep: [],
    devDep: ['eslint-config-prettier@10.1.8', 'prettier@3.6.2'],
  },
  swr: {
    dep: ['swr@2.3.6'],
    devDep: [],
  },
  mui: {
    dep: [
      '@mui/icons-material@7.3.4',
      '@mui/material@7.3.4',
      '@babel/runtime@7.28.4',
      '@emotion/cache@11.14.0',
      '@emotion/react@11.14.0',
      '@emotion/styled@11.14.1',
      '@mui/material-nextjs@7.3.3',
    ],
    devDep: [],
  },
  animations: {
    dep: ['framer-motion@12.23.24'],
    devDep: [],
  },
  redux: {
    dep: ['@reduxjs/toolkit@2.9.0', 'react-redux@9.2.0'],
    devDep: [],
  },
  d3: {
    dep: ['d3@7.9.0'],
    devDep: ['@types/d3@7.4.3'],
  },
  nextAuth: {
    dep: ['next-auth@4.24.11'],
    devDep: [],
  },
  prisma: {
    dep: ['@prisma/client@6.17.1', 'sqlite3@5.1.7'],
    devDep: ['prisma@6.17.1', 'tsx@4.20.6'],
  },
  i18n: {
    dep: ['i18next@25.6.0', 'react-i18next@16.0.0', 'i18next-resources-to-backend@1.2.1', 'next-i18n-router@5.5.4'],
    devDep: [],
  },
  pwa: {
    dep: [],
    devDep: [],
  },
  cypress: {
    dep: [],
    devDep: ['cypress@15.4.0'],
  },
  sse: {
    dep: ['uuid@13.0.0'],
    devDep: ['@types/uuid@11.0.0'],
  },
  webWorker: {
    dep: [],
    devDep: [],
  },
  husky: {
    dep: [],
    devDep: ['husky@9.1.7', 'lint-staged@16.2.4'],
  },
}

const packageBundles = {
  general: {
    dep: [],
    devDep: [
      '@eslint/eslintrc',
      '@eslint/js',
      '@next/eslint-plugin-next',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint-plugin-react-hooks',
    ],
  },
  linting: {
    dep: [],
    devDep: ['eslint-config-prettier', 'prettier'],
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
    dep: ['@prisma/client', 'sqlite3'],
    devDep: ['prisma', 'tsx'],
  },
  i18n: {
    dep: ['i18next', 'react-i18next', 'i18next-resources-to-backend', 'next-i18n-router'],
    devDep: [],
  },
  pwa: {
    dep: [],
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
      cmdDevDep += ` ${name}`
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

export function updateEnvPrisma(projectPath) {
  fs.appendFileSync(
    path.join(projectPath, '.env'),
    `
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# Example connection string for mysql, update to match your used database and database user
# DATABASE_URL=mysql://nxtstartUser:nxtstartPassword@localhost:3306/nxtstartDatabase
DATABASE_URL="file:nxtstart.db"

`,
    function (err) {
      if (err) throw err
      console.log(chalk.green('Added Prisma .env'))
    }
  )
}

export function updateEnvNextAuth(projectPath) {
  fs.appendFileSync(
    path.join(projectPath, '.env'),
    `
# Next Auth Variables
# For github apps: https://github.com/settings/developers
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
    "lint": "eslint ."<§linting§>,
    "prettierCheck": "yarn prettier . --check",
    "prettierFix": "yarn prettier . --write"</§linting§><§prisma§>,
    "db:seed": "tsx prisma/seedDb.ts"</§prisma§>
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
    "lint": "eslint ."<§linting§>,
    "prettierCheck": "npx prettier . --check",
    "prettierFix": "npx prettier . --write"</§linting§><§prisma§>,
    "db:seed": "tsx prisma/seedDb.ts"</§prisma§>
  }<§husky§>,
  "lint-staged": {
    "*.{js,jsx,ts,tsx,css,md,json}": "prettier --write"
  }</§husky§>`
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

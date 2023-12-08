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
  'tailwind',
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

const packageBundles = {
  general: {
    dep: ['@emotion/cache', '@emotion/react', '@emotion/server', '@emotion/styled', 'sharp'],
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
    dep: ['@mui/icons-material', '@mui/material'],
    devDep: [],
  },
  animations: {
    dep: ['framer-motion'],
    devDep: [],
  },
  tailwind: {
    dep: ['tailwindcss', 'postcss'],
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
    dep: ['@prisma/client', '@yarnpkg/pnpify'],
    devDep: ['prisma'],
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

export function addPackages(packageManager, packageNamesUser, projectPath) {
  shell.cd(projectPath)

  // add general packages
  const packageNames = ['general', ...packageNamesUser]

  let cmdDep = packageManager === 'yarn' ? 'yarn add' : 'npm install'
  let cmdDevDep = packageManager === 'yarn' ? 'yarn add' : 'npm install'

  for (let i = 0; i < packageNames.length; i++) {
    const packageName = packageNames[i]
    packageBundles[packageName].dep.forEach((name) => {
      // @yarnpkg/pnpify not needed for npm
      if (packageManager !== 'npm' || name !== '@yarnpkg/pnpify') {
        cmdDep += ` ${name}`
      }
    })
    packageBundles[packageName].devDep.forEach((name) => {
      cmdDevDep += ` ${name}`
    })
  }

  if (cmdDep) {
    shell.exec(cmdDep)
  }

  if (cmdDevDep) {
    cmdDevDep += ` ${packageManager === 'yarn' ? '--dev' : '--save-dev --legacy-peer-deps'}`
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
    "start": "next start",
    <§cypress§>"test": "cypress run",
    "cypressGui": "cypress open",</§cypress§>
    "lint": "next lint",
    <§linting§>"prettierCheck": "yarn prettier . --check",
    "prettierFix": "yarn prettier . --write",</§linting§>
    <§prisma§>"db:generate": "yarn pnpify prisma generate",</§prisma§>
    <§husky§>"prepare": "husky install"</§husky§>
  },<§husky§>
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
    "start": "next start",
    <§cypress§>"test": "cypress run",
    "cypressGui": "cypress open",</§cypress§>
    "lint": "next lint",
    <§linting§>"prettierCheck": "npx prettier . --check",
    "prettierFix": "npx prettier . --write",</§linting§>
    <§husky§>"prepare": "husky install"</§husky§>
  },<§husky§>
  "lint-staged": {
    "*.{js,jsx,ts,tsx,css,md,json}": "prettier --write"
  }</§husky§>`
      )
    }
    if (packages.includes('prisma')) {
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
          shell.exec('yarn run prepare')
          shell.exec('npx husky add .husky/pre-commit "yarn lint-staged"')
        } else if (packageManager === 'npm') {
          shell.exec('npm run prepare')
          shell.exec('npx husky add .husky/pre-commit "npx lint-staged"')
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
